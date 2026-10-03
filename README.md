# York Community Choir

Single-page site for York Community Choir. It's built with Vite, React and TypeScript, hosted on Vercel, and sends contact-form email through Resend.

## Develop

```bash
npm install
cp .env.example .env.local   # add your Resend key to test the form locally
npm run dev
```

`npm run dev` also serves `/api/contact` locally through a small Vite middleware, so you don't need `vercel dev`.

## Structure

- `src/content.ts`: all copy, links, concerts, programmes and social URLs. Edit content here.
- `src/components/`: one component per page section, in design order.
- `api/contact.ts`: the Vercel function that validates the form and sends it via Resend.
- `public/images`, `public/media`: photos and the 720p Rutter performance video.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel. It detects the Vite framework automatically.
2. Under Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`: the inbox that receives enquiries (separate multiple addresses with commas)
   - `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend, e.g. `York Community Choir <website@yorkcommunitychoir.co.uk>`
3. In Resend, verify the sending domain by adding the DNS records it gives you.
