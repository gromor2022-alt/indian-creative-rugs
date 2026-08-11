ICR Lenis Integration — clean production files

Changed:
- package.json: added lenis ^1.3.25
- globals.css: imports lenis/dist/lenis.css
- LenisProvider.tsx: client-side ReactLenis root provider
- layout.tsx: wraps the existing Header/main/Footer shell with LenisProvider
- page.tsx: unchanged copy of the supplied homepage

Install:
  npm install

Or, if you want to install the exact current release explicitly:
  npm install lenis@1.3.25

Then:
  npm run build
  npm run start

No GSAP, no ScrollTrigger, and no homepage/product/dashboard logic changes.
