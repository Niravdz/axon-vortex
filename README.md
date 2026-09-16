# AxonVortex — Digital Growth Engineering & Technology Architecture

Official web platform for **AxonVortex**, an architectural digital growth agency combining AI, human strategy, performance marketing, full-stack websites/e-commerce, and digital transformation. Built with a high-impact **Bauhaus Tech / Swiss Modernism** aesthetic and an engineered interactive motion system.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/) with App Router
- **Runtime & UI**: [React 19](https://react.dev/) & TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom Bauhaus design token system
- **Typography**: Space Grotesk (Primary & Headings) and Space Mono (Technical Accents) via `next/font/google`
- **Motion & Physics**:
  - [Lenis](https://lenis.darkroom.engineering/) — Momentum smooth scroll engine
  - [GSAP & ScrollTrigger](https://greensock.com/gsap/) — Precision architectural entrance and stagger reveals
  - [Framer Motion](https://www.framer.com/motion/) — Route transitions and UI interactions
  - [Three.js & React Three Fiber](https://threejs.org/) — 3D Bauhaus geometric canvas elements
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📋 Prerequisites

- **Node.js**: `v20.x` or higher (Recommended: `v24.x` or latest LTS)
- **Package Manager**: `npm` (v10+ or v11+)

---

## 🛠️ Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Niravdz/axon-vortex.git
   cd axon-vortex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Real secrets, API keys, or deployment tokens must never be committed.*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Build & Verification Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js Turbopack dev server |
| `npm run build` | Compiles optimized static/server production bundle |
| `npm run start` | Runs production build locally |
| `npm run typecheck` | Validates TypeScript with strict type checking (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint analysis across all components and pages |

---

## 📁 Project Architecture & Structure

```
axon-vortex/
├── app/                                # Next.js App Router root
│   ├── layout.tsx                      # Root layout, font definitions, scroll provider
│   ├── page.tsx                        # AxonVortex Homepage
│   ├── globals.css                     # Global styles, Tailwind base & utility presets
│   ├── about/                          # About & philosophy page
│   ├── approach/                       # Strategic methodology & growth loop
│   ├── authority-conversion/           # Authority conversion architecture
│   ├── growth-audit/                   # Comprehensive system diagnosis intake
│   ├── insights/                       # Insights & engineering whitepapers
│   ├── contact/                        # Project intake & consultation desk
│   ├── services/                       # 14 Capabilities Architectural Directory
│   │   └── [slug]/                     # Dynamic service capability detail pages
│   ├── solutions/                      # Solutions overview & matrix
│   ├── digital-marketing/              # Solution domain: Digital Marketing
│   ├── ai-automation/                  # Solution domain: AI & Automation
│   ├── websites-ecommerce/             # Solution domain: Websites & E-Commerce
│   ├── lead-generation/                # Solution domain: Lead Generation
│   ├── technology-digital-transformation/ # Solution domain: Tech Transformation
│   ├── privacy-policy/                 # Privacy Policy (Statutory compliance)
│   ├── terms-of-service/               # Terms of Service (Statutory compliance)
│   └── api/
│       └── contact/route.ts            # Secure intake transmission endpoint
├── components/
│   ├── animation/                      # ScrollReveal, MotionWrapper, PageTransition
│   ├── canvas/                         # Three.js 3D geometric interactive scene
│   ├── legal/                          # Legal document layouts & content
│   ├── navigation/                     # Desktop mega-menu, mobile accordion drawer
│   ├── providers/                      # SmoothScrollProvider (Lenis + GSAP bridge)
│   ├── sections/                       # Bauhaus hero, process, and journey sections
│   └── ui/                             # BauhausBadge, Button, and tactile components
├── data/
│   └── content/                        # Type-safe structured domain and service data
├── lib/
│   ├── gsap.ts                         # GSAP plugin initialization and registration
│   └── hooks/                          # Custom React hooks (e.g., useReducedMotion)
├── public/                             # Static assets, diagrams, logos, and icons
├── styles/
│   └── tokens.css                      # Centralized Bauhaus CSS design tokens
├── next.config.ts                      # Next.js configuration and package transpilation
└── tailwind.config.ts                  # Bauhaus color matrix & typographic tokens
```

---

## 🚢 Vercel Deployment Guide

### Automatic Git Integration (Recommended)
1. Push your latest commits to the `main` branch of this repository.
2. Link the repository to your [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. Add environment variables in Vercel Project Settings if needed (`NEXT_PUBLIC_SITE_URL`).
5. Trigger deployment; each subsequent push to `main` will automatically build and deploy to production.

### Manual CLI Deployment
```bash
npx vercel login
npx vercel link
npx vercel --prod
```

---

## 🔒 Security & Privacy

- Sensitive tokens and `.env*` files are strictly excluded via `.gitignore`.
- Intake forms sanitize input and validate privacy consent prior to transmission.
- All dependencies are regularly audited with `npm audit`.

---

© AxonVortex. All rights reserved.
