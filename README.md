# FrostOnMars

[![Lint](https://github.com/FrostOnMars/FrostOnMars.github.io/actions/workflows/lint.yml/badge.svg)](https://github.com/FrostOnMars/FrostOnMars.github.io/actions/workflows/lint.yml)

The home base for my portfolio and the experiments I build while learning and
playing with code.

**[Visit the site → frostonmars.github.io](https://frostonmars.github.io/)**

I'm Mikayla, an IT professional and developer who likes making complicated
things a little simpler. This site is where finished work lives next to
works in progress, so it's always a little under construction, on purpose.

## What's here

### Portfolio

The [home page](https://frostonmars.github.io/) introduces me and links to
the things I've made. It has a hand-built light and dark theme; the dark one
comes with a quiet, starry night sky.

### Squires of Linux

[Medieval text adventures](https://frostonmars.github.io/Squires.html) that
teach kids aged 8–10 real Linux commands in a simulated, browser-based
terminal. I first built them for my son.

- **[The Market Thief](https://frostonmars.github.io/market-thief.html):**
  track a thief through the market using `ls`, `cd`, `cat`, `pwd`, `mkdir`,
  `mv`, and `ls -a`.
- **[Bird of the Belltower](https://frostonmars.github.io/bird-of-the-belltower.html):**
  rescue a mischievous bird and ring the tournament bell with `grep`,
  `chmod +x`, and `./script.sh`.

The games have their own styling for now, which I'll fold into the main
site's design.

## How it's built

Plain HTML, CSS, and JavaScript. There's no framework and no build step, and
GitHub Pages serves the files as they are.

- **Design tokens.** Colors, type, spacing, and layout values live in one
  file, [`tokens.css`](assets/css/tokens.css). Each color holds its light and
  dark value together with `light-dark()`.
- **Layered CSS.** Tokens, then base element styles, then reusable
  components, then page-specific layout.
- **Accessibility.** Semantic landmarks, a skip link, visible keyboard
  focus, reduced-motion support, and contrast that meets WCAG AAA in both
  themes.
- **Performance.** WebP images with explicit dimensions, and lazy loading
  for anything below the fold.
- **Progressive enhancement.** The theme follows your system setting even
  without JavaScript; the toggle only appears when JavaScript is available
  to run it.
- **Code quality.** Prettier, ESLint, and Stylelint, checked by GitHub
  Actions on every push.

## Project structure

```text
├── index.html                  Portfolio home page
├── 404.html                    "Lost in space" error page
├── Squires.html                Squires of Linux quest board
├── market-thief.html           Quest I
├── bird-of-the-belltower.html  Quest II
├── assets/
│   ├── css/
│   │   ├── tokens.css          Design tokens (both themes)
│   │   ├── base.css            Element defaults and night sky
│   │   ├── components.css      Header, buttons, cards, footer
│   │   ├── pages/              Page-specific layout
│   │   └── squires.css         Game styles (temporary)
│   ├── js/
│   │   ├── theme.js            Light and dark theme toggle
│   │   ├── terminal.js         Shared simulated terminal for the games
│   │   └── *.js                One script per quest
│   └── images/
└── tests/                      Manual test page for game conversations
```

## Running it locally

Open any `.html` file in a browser. That's all you need.

To use the code-quality tools, install [Node.js](https://nodejs.org/) (the
version is in [`.nvmrc`](.nvmrc)) and run:

```sh
npm install
npm run lint     # check formatting, JavaScript, and CSS
npm run format   # apply Prettier formatting
```
