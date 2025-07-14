# Ciric React

This project requires **Node.js** version **18** or higher and **npm**.

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Production Build

Generate a production build:

```bash
npm run build
```

## Testing

No automated tests exist yet. Run `npm test` to execute a placeholder script until tests are added.

## Style Guide

Common design tokens are defined in `src/styles/globals.css`. Colors,
spacing, breakpoints and typography sizes are exposed as CSS variables
so components can share a consistent look across sites. Use variables
like `--primary-color` and `--card-bg` to style cards and interactive
elements. The base font sizes range from `--font-size-sm` to
`--font-size-xl` to keep text scalable and readable.

Run `npm run format` to automatically format source files with Prettier.
The project includes `prettier-plugin-tailwindcss` so utility classes are
sorted consistently.

## Tailwind CSS migration

Tailwind CSS is now included alongside the existing CSS Modules. The
`tailwind.config.js` file exposes colors and typography pulled from
`src/styles/globals.css`, so utility classes like `text-primary` or
`font-heading` share the same design tokens as the rest of the project.
Simple layout and spacing styles should gradually move to Tailwind
utilities while complex components continue to use CSS Modules.
