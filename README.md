# Angel Event landing page

Mongolian company landing page built with Next.js, using the supplied Eventflow
one-page template CSS, service cards, gradient buttons, and event section styling.
Django and the template's jQuery plugins are not required.

## Run

From `portal`: `pnpm install --frozen-lockfile`, then `pnpm dev`.
For Vercel, select `portal` as the root directory and the Next.js preset.

## Content

- `portal/src/config/site.ts`: company copy, services, and contact information from the supplied introduction.
- `portal/src/config/videos.ts`: six video records, original filenames, thumbnails, and playback URLs.
- `portal/src/features/landing/components/`: page layout and accessible native video dialog.
- `portal/styles/`: supplied Eventflow CSS bundled by Next.js. `portal/public/eventflow/`: decorative assets. Retain the appropriate template license for publication.
- `portal/public/images/events/`: compressed still frames extracted from the supplied footage.

## Replace demo videos

Each video currently plays a public third-party sample clip, clearly labelled as a demo
inside the player. Replace each `src` in `portal/src/config/videos.ts` with its permanent
HTTPS S3 or CloudFront URL and set `isDemo` to `false`. `originalFile` identifies the
corresponding upload. Add captions where the final footage contains speech.
Videos are mounted only when a portfolio card is opened and removed when closed.
The original multi-hundred-megabyte videos are not included in this repository.

Contact buttons call the supplied phone numbers or open email. No form backend is
required. The optional starter backend remains unused.

## Checks

From `portal`: `pnpm typecheck`, `pnpm lint`, `pnpm build`.
No deployment has been performed.
