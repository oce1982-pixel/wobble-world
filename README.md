# Wobble World

A kids' collect-a-thon game: hatch and collect 36 Wobblers, play six mini-games, dress up your buddy, build a room, earn badges and climb the rivals ladder. The game is one HTML file with no dependencies, no backend, no ads and no data collection.

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

## Store submission checklist

- [ ] Host `PRIVACY.md` somewhere public and add your contact email to it
- [ ] Upload screenshots from `store/screenshots/` and `store/feature-graphic.png`
- [ ] Paste the copy from `store/LISTING.md`
- [ ] Content rating: answer "no" to everything (no ads, purchases, chat, data, violence)
- [ ] Apple "Kids" category requires the app to have no third-party analytics or ads — this app has neither
- [ ] Change `appId` in `capacitor.config.json` (`com.wobbleworld.app`) to your own reverse-domain id before the first upload; it cannot be changed after

## Scripts

| command | what it does |
|---|---|
| `npm run build` | copy the app into `www/` |
| `npm run sync` | build + copy into iOS and Android projects |
| `npm run ios` / `npm run android` | sync and open the native IDE |
| `npm run screenshots` | regenerate store screenshots with headless Chrome |
| `npm run icons` | regenerate web icons |

## Save data

Progress lives in local storage under the key `wobble-world-v2`. Delete it to reset.
