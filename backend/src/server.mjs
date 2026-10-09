import { createServer } from "node:http";

const port = Number.parseInt(process.env.PORT ?? "4000", 10);
const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
const submissionsByIp = new Map();

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  if (origin && corsOrigins.includes(origin)) {
    response.setHeader("access-control-allow-origin", origin);
    response.setHeader("vary", "origin");
  }
  response.setHeader("access-control-allow-methods", "GET,POST,OPTIONS");
  response.setHeader("access-control-allow-headers", "content-type");
}

function clientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0].trim();
  return request.socket.remoteAddress ?? "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);
  if (!entry || now - entry.startedAt > rateLimitWindowMs) {
    submissionsByIp.set(ip, { count: 1, startedAt: now });
    return false;
  }
  entry.count += 1;
  return entry.count > rateLimitMax;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 20_000) {
        reject(new Error("Request body is too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Request body must be valid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function validateContactInput(input) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const company = typeof input.company === "string" ? input.company.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) return { error: "Name is required." };
  if (!emailPattern.test(email)) return { error: "Valid email is required." };
  if (message.length < 10) return { error: "Message must be at least 10 characters." };

  return { value: { company, email, message, name } };
}

async function handleContact(request, response) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    sendJson(response, 429, { message: "Too many submissions. Try again soon." });
    return;
  }

  const input = await readJsonBody(request);
  const parsed = validateContactInput(input);
  if (parsed.error) {
    sendJson(response, 400, { message: parsed.error });
    return;
  }

  console.log("Website contact submission", {
    company: parsed.value.company || null,
    email: parsed.value.email,
    name: parsed.value.name,
    receivedAt: new Date().toISOString(),
    target: process.env.CONTACT_TO_EMAIL ?? null,
  });
  sendJson(response, 202, { ok: true });
}

const server = createServer(async (request, response) => {
  applyCors(request, response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/api/v1/health/live") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && request.url === "/api/v1/health") {
    sendJson(response, 200, { backend: "website", ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/api/v1/public/contact") {
    try {
      await handleContact(request, response);
    } catch (error) {
      sendJson(response, 400, { message: error instanceof Error ? error.message : "Invalid request" });
    }
    return;
  }

  sendJson(response, 404, { message: "Not found" });
});

server.listen(port, () => {
  console.log(`Website backend listening on http://localhost:${port}`);
});
