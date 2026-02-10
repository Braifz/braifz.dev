# Braifz.dev 

This is my personal website and blog, built with Next.js 16, React 19 and TypeScript.
Built with <3 using Next.js, Three.js, and modern web technologies.

### Features 

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- GSAP for animations
- Content Collections for blog posts
- Pnpm for package management
- Content Collections for blog posts


### Project Structure

```
braifz.dev/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages and dynamic routes
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── content/
│   └── blog/              # MDX blog posts
├── public/                # Static assets
│   ├── blog/              # Blog images
│   ├── logos/             # Company logos
│   └── video/             # Video assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── blog/          # Blog-specific components
│   │   ├── common/        # Shared components
│   │   ├── home/          # Homepage components
│   │   └── ui/            # UI component library
│   ├── lib/               # Utility libraries
│   │   ├── gsap/          # GSAP configuration
│   │   └── utils.ts       # Utility functions
│   └── api.ts             # API functions
└── content-collections.ts # Content configuration
```
