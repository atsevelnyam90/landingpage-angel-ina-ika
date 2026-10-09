# Angel Event landing page

Mongolian company landing page built with Next.js, using the supplied Eventflow
one-page template CSS, service cards, gradient buttons, and event section styling.
Django and the template's jQuery plugins are not required.

## Run

From `portal`: `pnpm install --frozen-lockfile`, then `pnpm dev`.
For Vercel, select `portal` as the root directory and the Next.js preset.

## Content

- `portal/src/config/site.ts`: company copy, services, and contact information from the supplied introduction.
- `portal/src/config/videos.ts`: twelve video records, original filenames, thumbnails, and playback URLs.
- `portal/src/features/landing/components/`: page layout and accessible native video dialog.
- `portal/styles/`: supplied Eventflow CSS bundled by Next.js. `portal/public/eventflow/`: decorative assets. Retain the appropriate template license for publication.
- `portal/public/images/events/`: compressed still frames extracted from the supplied footage.

## Portfolio videos

All twelve portfolio records point to public MP4 objects in the `angel-ina-ika` S3
bucket in `us-east-1`. The matching `originalFile` is retained in the video config.
Replace `src` there when switching to compressed videos or CloudFront delivery.
All twelve URLs were checked for public access, MP4 content type, and byte-range support.
Videos are mounted only when a portfolio card is opened and removed when closed.
The original large videos are not included in this repository.
Add verified captions when transcripts become available.
Contact buttons call the supplied phone numbers or open email. No form backend is
required. The optional starter backend remains unused.

## Checks

From `portal`: `pnpm typecheck`, `pnpm lint`, `pnpm build`.
No deployment has been performed.

Brand artwork from the supplied transparent logos is used in the header, footer,
and browser icons. Assets live in portal/public/images/brand and portal/public.
