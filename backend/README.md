# Optional website backend

Run `npm run check` and `npm start` here. No dependencies are required.
To load custom settings from `.env`, copy `.env.example` and run
`node --env-file=.env src/server.mjs` with a Node.js version supporting that flag.

Endpoints:
- `GET /api/v1/health`
- `GET /api/v1/health/live`
- `POST /api/v1/public/contact`

This starter validates requests and logs basic contact details. It does not deliver
email or persist messages. Configure delivery before mounting the contact form.
