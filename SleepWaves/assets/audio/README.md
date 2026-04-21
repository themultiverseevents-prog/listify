# Audio Assets

Add your audio file here:

- File name: `heavy-rain.mp3`
- Recommended: 5–30 second seamless loop (will repeat automatically)

To use a local file instead of the CDN URL, update `src/services/audioService.ts`:

```ts
// Replace the HEAVY_RAIN_SOURCE constant with:
const HEAVY_RAIN_SOURCE = require('./assets/audio/heavy-rain.mp3');
```

Free heavy rain loops:
- https://freesound.org (search "rain loop")
- https://pixabay.com/sound-effects/
