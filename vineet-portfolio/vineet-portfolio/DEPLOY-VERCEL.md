# Deploying this portfolio to Vercel

All files the site shows (CV + 5 certificate images) now live inside the project,
so nothing depends on Lovable's file hosting.

## Steps

1. Push this project to a GitHub repository.
2. In Vercel, "Add New Project" and import that repository.
3. Framework preset: **Other** (Vite). Vercel detects the scripts automatically:
   - Install command: `bun install` (or `npm install`)
   - Build command: `npm run build`
4. Add one Environment Variable so the server build targets Vercel instead of the
   default Cloudflare target:

   | Name           | Value    |
   | -------------- | -------- |
   | `NITRO_PRESET` | `vercel` |

5. Deploy.

## Notes

- The CV is served from `public/vineet_kumar_cv.pdf` → available at `/vineet_kumar_cv.pdf`.
- Certificate images are imported from `src/assets/` and fingerprinted by the build.
- The leftover `*.asset.json` files in `src/assets/` are no longer used by the page;
  they are harmless and can be deleted if you like.
