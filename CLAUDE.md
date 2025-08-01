# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application configured for deployment on Cloudflare Workers using OpenNext. The project uses TypeScript, Tailwind CSS v4, and the App Router architecture.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build production application
npm run build

# Preview Cloudflare Workers build locally
npm run preview

# Deploy to Cloudflare Workers
npm run deploy

# Run linting
npm run lint

# Type checking
npm run check

# Generate Cloudflare types
npm run cf-typegen
```

## Architecture

### Core Stack
- **Framework**: Next.js 15.3.3 with App Router
- **Deployment**: Cloudflare Workers via OpenNext adapter
- **Styling**: Tailwind CSS v4.1.1 with PostCSS
- **Language**: TypeScript with strict mode enabled
- **Font Management**: Uses next/font with Geist and Geist Mono fonts

### Project Structure
- `/src/app/` - Next.js App Router directory
  - `layout.tsx` - Root layout with metadata and font configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind directives
- `/public/` - Static assets including SVG icons and _headers file
- `/.open-next/` - Build output directory for Cloudflare Workers deployment

### Configuration Files
- `next.config.ts` - Next.js configuration with OpenNext development integration
- `open-next.config.ts` - OpenNext Cloudflare adapter configuration
- `wrangler.jsonc` - Cloudflare Workers deployment configuration
- `tsconfig.json` - TypeScript configuration with path alias `@/*` → `./src/*`
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind

### Deployment Architecture
The application is deployed as a static site on Cloudflare Workers:
1. `npm run build` creates a Next.js production build
2. OpenNext transforms the build output for Cloudflare Workers compatibility
3. Wrangler deploys to Cloudflare with:
   - Worker name: `flat-frost-7904`
   - Main entry: `.open-next/worker.js`
   - Assets served from `.open-next/assets`
   - Node.js compatibility mode enabled

### Environment Types
The project includes Cloudflare environment types via `env.d.ts` for type-safe access to Cloudflare bindings and environment variables.