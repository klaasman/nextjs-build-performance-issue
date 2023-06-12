# Degraded pages-directory build performance in next.js@v13.2.5-canary.26 and higher

I've ran into significant build performance issues since upgrading next.js from
v13.2.4 to v13.3.0 or higher. The build duration of a project I'm working on
became easily 2-7x slower after the upgrade. Building on vercel usually takes
about 10 minutes, but after the upgrade it was 25-30 minutes, unacceptable in my
workflow so I had to revert to v13.2.4.

After a lot of digging I was able to narrow it down to the v13.2.5-canary.26
release.

Luckily, it is easy to reproduce the issue with this simple next.js repo.

## Steps to reproduce

This repo contains a simple next.js project with a pages-directory containing
200 pages (`/number/[number].tsx`) which fake a 1 second delay before rendering
the page. Not sure if this is relevant, but it helps to make the issue more
visible.

1. Clone this repo
2. Run `npm install` - this will install next@v13.2.4
3. Run `rm -rf .next` to remove the build cache (if any)
4. Run `npm run build` - measure the build duration
5. Run `npm install next@v13.2.5-canary.26`
6. Run `rm -rf .next` to remove the build cache
7. Run `npm run build` - measure the build duration

The second build will/should be significantly slower.
See below for my results in finding the offending release.

## Results

- `0m30s` for `next@v13.2.4`  
  _30 seconds is the expected duration_
- `0m31s` for `next@v13.2.5-canary.14`
- `0m30s` for `next@v13.2.5-canary.22`
- `0m31s` for `next@v13.2.5-canary.24`
- `0m31s` for `next@v13.2.5-canary.25`
- `3m30s` for `next@v13.2.5-canary.26`  
   ⚠️ _this is where the build duration starts to degrade_ ([next@v13.2.5-canary.26 release notes](https://github.com/vercel/next.js/releases/tag/v13.2.5-canary.26))
- `3m34s` for `next@v13.2.5-canary.28`
- `3m33s` for `next@v13.2.5-canary.29`
- `3m23s` for `next@v13.3.4`  
   _maybe it got fixed somewhere in the v13.3.x range, but 13.3.4 doesnt show
  any improvement_
- `1m01s` for `next@v13.4.5`  
  _good improvement in next's latest release(s), but still 2x slower than
  v13.2.4_
- `1m02s` for `next@13.4.6-canary.0`
