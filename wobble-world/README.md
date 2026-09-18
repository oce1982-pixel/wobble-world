# Wobble World

A kids' collect-a-thon game: hatch and collect 36 Wobblers, play six mini-games, dress up your buddy, build a room, earn badges and climb the rivals ladder. One HTML file, no build step, no backend, no dependencies.

## Run it

Open `index.html` from any static web server (it needs http:// for the service worker and installability):

```bash
npx serve .
```

## Install as an app (PWA)

Served over HTTPS, the game is installable on Android (Chrome: "Add to Home screen"), desktop Chrome/Edge, and iOS Safari (Share → "Add to Home Screen"). It works offline after the first visit thanks to `sw.js`.

Free HTTPS hosting options: GitHub Pages, Netlify, Vercel, Cloudflare Pages — drag the folder in.

## Ship to the App Store / Google Play

The straightforward route is wrapping the PWA with Capacitor:

```bash
npm init -y
npm i @capacitor/core @capacitor/cli
npx cap init "Wobble World" com.yourname.wobbleworld --web-dir .
npm i @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap open ios      # opens Xcode — set your team, then Archive → Distribute
npx cap open android  # opens Android Studio — Build → Generate Signed Bundle
```

For Google Play there's an even lighter path: a Trusted Web Activity via [PWABuilder](https://www.pwabuilder.com) — paste the hosted URL and it produces a signed Android package.

Things the stores will ask for that are not in this folder yet:
- Screenshots (phone + tablet) and a feature graphic
- A privacy policy URL (this game stores progress only in the browser and sends nothing anywhere — say so)
- Age rating questionnaire (no ads, no purchases, no user content, no data collection)
- Apple Developer Program ($99/yr) and Google Play developer ($25 once) accounts

## Files

- `index.html` — the whole game
- `manifest.webmanifest` — PWA metadata and icons
- `sw.js` — offline cache
- `icons/` — generated app icons (`node icons/make-icons.js` regenerates them)

## Save data

Progress lives in `localStorage` under the key `wobble-world-v2`. Delete it to reset.
