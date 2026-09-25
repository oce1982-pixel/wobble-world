# Wobble World

A kids' collect-a-thon game: hatch and collect 58 Wobblers across four worlds and seasonal events, play eight mini-games, dress up your buddy, build a room, earn badges and climb the rivals ladder. The game is one HTML file with no dependencies, no backend, no ads and no data collection.

## Layout

```
index.html              the whole game (also served as the PWA)
manifest.webmanifest    PWA metadata, icons, home-screen shortcuts
sw.js                   offline cache
icons/                  PWA/web icons  (node icons/make-icons.js regenerates)
assets/                 sources for native icons + splash (make-icons.js --native)
store/                  store listing text, screenshots, feature graphic, screenshot tool
PRIVACY.md              privacy policy to host and link from the stores
www/                    build output copied into the native apps (npm run build)
ios/  android/          Capacitor native projects
```

## Run it locally

```bash
npm run build && npm start
```

**Live:** https://oce1982-pixel.github.io/wobble-world/ — every push to `main` redeploys it automatically via GitHub Actions.

Then open http://localhost:3000. Any static host works too (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Over HTTPS it is installable as an app on iOS, Android and desktop, and works offline.

Useful URLs: `?tab=play|shop|room|me` opens a tab, `?game=star|bop|mem|simon|rush|jump` starts a game, `?demo=1` loads sample progress (never saved).

## Ship to the stores

The native projects are already generated with Capacitor and carry the app icons and splash screens.

**iOS** — needs Xcode (Mac App Store) and an Apple Developer account ($99/yr):
```bash
npm run ios
```
In Xcode: select your Team under Signing & Capabilities, pick "Any iOS Device", then Product → Archive → Distribute App.

**Android** — needs Android Studio and a Google Play developer account ($25 once):
```bash
npm run android
```
In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle, then upload the `.aab` in Play Console.

After changing `index.html`, run `npm run sync` to push the new build into both native projects.

## In-app purchases

The game is free; optional purchases (Wobble Pass subscription, All Worlds Pass, coin packs, Golden Eggs) live in **Shop → 💎 Extras** behind a parental gate. On the web they are display-only. In the native apps they run through [RevenueCat](https://www.revenuecat.com) (`@revenuecat/purchases-capacitor`), which talks to both stores.

To switch them on:
1. Create the six products from `store/LISTING.md` in App Store Connect and Google Play Console
2. Create a RevenueCat project, add both apps, import the products, create entitlements `pass` and `worlds`, and put all six products in the default offering
3. Paste the two public API keys into `IAP_KEYS` near the top of the purchases section in `index.html`
4. `npm run sync`, then test with a sandbox account before release

`?iaptest=1` in the URL simulates successful purchases on the web (nothing is charged) for testing the UI. The native purchase flow has not been exercised on a device yet — test it in sandbox before shipping.

## Store submission checklist

- [ ] Host `PRIVACY.md` somewhere public and add your contact email to it
- [ ] Upload screenshots from `store/screenshots/` and `store/feature-graphic.png`
- [ ] Paste the copy from `store/LISTING.md`
- [ ] Content rating: no ads, no chat, no data collection, no violence — **yes** to in-app purchases
- [ ] Add the Terms of Use URL (`terms.html`) and Privacy URL (`privacy.html`) to the App Store listing (required for subscriptions)
- [ ] Apple "Kids" category requires the app to have no third-party analytics or ads — this app has neither
- [ ] Change `appId` in `capacitor.config.json` (`com.wobbleworld.app`) to your own reverse-domain id before the first upload; it cannot be changed after

## Scripts

| command | what it does |
|---|---|
| `npm run verify` | **run before every push** — static checks + headless smoke test |
| `npm run build` | check, then copy the app into `www/` |
| `npm run sync` | build + copy into iOS and Android projects |
| `npm run ios` / `npm run android` | sync and open the native IDE |
| `npm run screenshots` | regenerate store screenshots with headless Chrome |
| `npm run icons` | regenerate web icons |

## Testing

`npm run verify` parses every inline script, checks declaration order (a `const` used before it is defined kills the whole page), then loads the built pages in headless Chrome and fails if a screen did not render or threw. The same three steps gate the GitHub Pages deploy, so a broken build cannot reach the live site.

## Save data

Progress lives in local storage under the key `wobble-world-v2`. Delete it to reset.
