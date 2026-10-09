"use client";

import { type FormEvent, useState } from "react";
import { site } from "@/config/site";

type SubmitState = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("submitting");
    setMessage("");

    try {
      const response = await fetch(site.contactApiUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company: data.get("company"),
          email: data.get("email"),
          message: data.get("message"),
          name: data.get("name"),
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setState("sent");
      setMessage("Thanks. Your message is queued.");
    } catch {
      setState("error");
      setMessage("The form could not be sent. Check the contact endpoint.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" minLength={2} required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Company
        <input name="company" />
      </label>
      <label>
        Message
        <textarea name="message" minLength={10} required rows={5} />
      </label>
      <button disabled={state === "submitting"} type="submit">
        {state === "submitting" ? "Sending" : "Send message"}
      </button>
      {message ? <p className={state === "error" ? "form-error" : "form-ok"}>{message}</p> : null}
    </form>
  );
}
