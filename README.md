# color-tool

A tool to design color scales

Heavily inspired by:

- [hihayk color scale](https://hihayk.github.io/scale/) | [repo](https://github.com/hihayk/scale)
- [color x color](https://colorcolor.in/) | [repo](https://github.com/saneef/color-color)

See also:

- [D3-Color](https://d3js.org/d3-color)
- [Tailwind](https://tailwindcss.com/)
- [NextJS](https://nextjs.org/)
- [React Contexts](https://react.dev/learn/passing-data-deeply-with-context)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- Start with a "key" color
- Set number of light and dark steps
- Adjust hue shift in both directions with easing options
- Adjust lightness shift in both directions with easing options
- Adjust saturation shift in both directions with easing options
- Click each color to copy hex code
- Display a luminance graph
- Display a chroma graph
- Display a hue graph
- Share settings via JSON export

## Roadmap

- Click button to copy all hex colors
- Display WCAG contrast info

## Stretch goals

- Ability to define color space
- Click a button to copy an SVG of all colors to be pasted into design software
