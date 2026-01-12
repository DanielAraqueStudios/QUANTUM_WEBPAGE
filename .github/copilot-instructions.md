# NeuralGlass — Premium Motion-Forward Rebuild Instructions

## Current State (Starting Point)
**Existing:** Vanilla HTML/CSS/JS single-page site (TemplateMo 597 Neural Glass)
- [index.html](../index.html) — single-page structure with sections (hero, features, showcase, timeline, contact)
- [templatemo-neural-style.css](../templatemo-neural-style.css) — glassmorphism styles, animations
- [templatemo-neural-scripts.js](../templatemo-neural-scripts.js) — vanilla JS (mobile menu, scroll effects, particles)
- Color palette: `#e0a3ff` (purple), `#ff69b4` (pink), `#9370db`, `#00ffff` (cyan), `#000` (black)

## Vision: Premium Motion-Forward Experience
Transform this into a **cinematic, performance-minded, interaction-rich web experience** inspired by:
- **mokn.io** — refined scroll storytelling, magnetic interactions
- **estrela.studio** — high-contrast typography, smooth transitions
- **aurigaspace.com** — elegant 3D moments, spatial design
- **planpoint-webgpu.vercel.app** — WebGPU/R3F technical sophistication
- **ds-k.site** — micro-interactions, motion hierarchy

**Do NOT copy visuals 1:1.** Recreate the **interaction principles**: cinematic page transitions, scroll-driven reveals, magnetic hover effects, and optional 3D/WebGPU scenes.

---

## Target Stack & Architecture

### Required Modern Stack
Migrate to this architecture to achieve reference-level quality:

**Core Framework:**
- **React 18+** with TypeScript (strict mode)
- **Next.js 14+** (App Router) OR **Vite** for build tooling
- File structure:
  ```
  src/
    components/     # UI components (Button, Card, etc.)
    sections/       # Page sections (Hero, Features, etc.)
    hooks/          # Custom React hooks
    utils/          # Helpers, constants
    styles/         # Global CSS, design tokens
    app/           # Next.js routes (or pages/ for Vite)
  ```

**Motion System:**
- **GSAP 3.12+** + **ScrollTrigger** — scroll choreography, timelines
- **Framer Motion** — component-level transitions, page routes
- **Lenis** — ultra-smooth scroll (required for premium feel)

**3D/WebGPU (Progressive Enhancement):**
- **Three.js** + **React Three Fiber (R3F)** + **Drei** — 3D scenes
- Lazy-load 3D components (`React.lazy()` or Next.js dynamic imports)
- Feature-detect WebGPU, fallback to WebGL2/static image
- Keep scenes minimal: low poly, compressed textures, <100 draw calls

**Styling:**
- **Tailwind CSS** OR **CSS Modules** (pick one, stay consistent)
- Preserve existing color palette: use CSS variables/design tokens
- Maintain glassmorphism aesthetic (backdrop-filter, gradients)

**Performance:**
- Code-split routes and heavy components
- Lazy-load images (Next.js Image or native `loading="lazy"`)
- Target Core Web Vitals: LCP <2.5s, CLS <0.1, FID <100ms

---

## Motion + Interaction System (Must Implement)

### 1. Page/Route Transitions
Use Framer Motion's `AnimatePresence` for route changes:
```tsx
// app/layout.tsx (Next.js) or App.tsx (Vite)
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 2. Scroll-Driven Storytelling
Implement with GSAP ScrollTrigger:
```tsx
// Example: Section reveal on scroll
useEffect(() => {
  gsap.from('.section', {
    scrollTrigger: {
      trigger: '.section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
    opacity: 0,
    y: 100,
    stagger: 0.2,
  });
}, []);
```

**Key Patterns:**
- Hero parallax: images move slower than text (`scrollTrigger.scrub`)
- Section reveals: fade + translateY timed to viewport entrance
- Pinned sequences: pin section while sub-content animates through

### 3. Micro-Interactions
**Magnetic Buttons:**
```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(e.currentTarget, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.4,
    ease: 'power2.out',
  });
};
```

**Hover States (all interactive elements):**
- Scale: `scale(1.05)` on hover
- Underline sweep: `width: 0 → 100%` gradient line
- Icon nudge: `translateX(5px)` on arrow icons

**Click Feedback:**
- Press down: `scale(0.95)`, `opacity: 0.8`
- Release: spring back with `ease: [0.34, 1.56, 0.64, 1]`

### 4. Smooth Scrolling
**Install Lenis:**
```bash
npm install @studio-freight/lenis
```

**Integrate:**
```tsx
// hooks/useSmoothScroll.ts
import Lenis from '@studio-freight/lenis';

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  return () => lenis.destroy();
}, []);
```

### 5. Accessibility + Reduced Motion
**Always provide fallbacks:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In React:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const transition = prefersReducedMotion 
  ? { duration: 0 } 
  : { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
```

---

## 3D/WebGPU Implementation (Optional, Progressive)

### When to Use 3D
Only add if it enhances storytelling (hero scene, product showcase, immersive about section). Keep it **minimal and purposeful**.

### Setup React Three Fiber
```bash
npm install three @react-three/fiber @react-three/drei
```

**Lazy-load 3D Scene:**
```tsx
const Scene3D = lazy(() => import('@/components/Scene3D'));

// In component:
<Suspense fallback={<div className="loading-placeholder" />}>
  <Scene3D />
</Suspense>
```

**Example Minimal Scene:**
```tsx
// components/Scene3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e0a3ff" />
      </mesh>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
```

**Performance Rules:**
- Limit to <100 draw calls
- Use `useGLTF` with Draco compression
- Implement LOD (Level of Detail) for complex models
- Provide static fallback for low-end devices:
  ```tsx
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  return isMobile ? <StaticImage /> : <Scene3D />;
  ```

---

## Migration Strategy (From Current Vanilla to Modern Stack)

### Phase 1: Setup Modern Stack
1. Initialize Next.js with TypeScript:
   ```bash
   npx create-next-app@latest neuralglass --typescript --tailwind --app
   cd neuralglass
   ```

2. Install motion libraries:
   ```bash
   npm install gsap @studio-freight/lenis framer-motion
   npm install @react-three/fiber @react-three/drei three
   ```

3. Setup folder structure (as defined above)

### Phase 2: Convert Sections to Components
Migrate each section from [index.html](../index.html) to React components:
- `sections/Hero.tsx` — hero with animated stats, CTA buttons
- `sections/Features.tsx` — diagonal grid layout
- `sections/Showcase.tsx` — hexagon grid (consider CSS Grid + clip-path)
- `sections/Timeline.tsx` — vertical timeline with GSAP scroll animations
- `sections/Contact.tsx` — form with validation (React Hook Form)

**Preserve Existing Styles:**
```tsx
// tailwind.config.ts
colors: {
  primary: '#e0a3ff',
  secondary: '#ff69b4',
  tertiary: '#9370db',
  accent: '#00ffff',
}
```

### Phase 3: Implement Motion System
1. Add Lenis smooth scroll to root layout
2. Implement GSAP ScrollTrigger for section reveals
3. Add Framer Motion page transitions
4. Build reusable animated components:
   - `<MagneticButton />` — magnetic hover effect
   - `<FadeIn />` — scroll-triggered fade wrapper
   - `<Parallax />` — parallax scroll container

### Phase 4: Add 3D (Optional)
1. Create hero 3D scene (replace static shapes)
2. Lazy-load with `React.lazy()`
3. Feature-detect WebGPU, fallback gracefully

### Phase 5: Optimize & Polish
1. Run Lighthouse (aim for 95+ performance)
2. Add image optimization (Next.js Image)
3. Implement error boundaries
4. Test accessibility (keyboard nav, screen readers)
5. Test on mobile devices (iOS Safari, Chrome Android)

---

## Code Quality Standards

### TypeScript Rules
- **No `any` types** — use `unknown` and type guards
- Explicit return types on all functions
- Strict null checks enabled

### Component Patterns
```tsx
// Good: Typed, composable, single responsibility
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
```

### Performance Checklist
- [ ] Code-split routes and heavy components
- [ ] Lazy-load 3D scenes and large libraries
- [ ] Use GPU-friendly animations (transform/opacity only)
- [ ] Implement `will-change` sparingly (remove after animation)
- [ ] Optimize images (WebP, AVIF formats, responsive sizes)
- [ ] Minimize layout shifts (reserve space for dynamic content)

### Accessibility Checklist
- [ ] All interactive elements keyboard-accessible
- [ ] Focus states visible (outline or custom style)
- [ ] ARIA labels on icon buttons and complex interactions
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] `prefers-reduced-motion` respected globally

---

## AI Agent Workflow (How to Respond)

When implementing a feature, provide:
1. **Plan** (3-7 bullets): High-level approach tailored to this stack
2. **File changes**: Exact paths for new/modified files
3. **Code**: Complete, paste-ready TypeScript/React components
4. **Dependencies**: If adding libraries, show install command + justification
5. **Testing notes**: What to verify (visual, performance, a11y)

**Example Response:**
```markdown
## Implementing Magnetic Button Component

### Plan
1. Create reusable MagneticButton component with GSAP
2. Add mouse tracking with bounds calculation
3. Implement smooth return-to-center on mouse leave
4. Make it accessible (keyboard focus, reduced motion)

### Files
- `src/components/MagneticButton.tsx` (new)
- `src/sections/Hero.tsx` (update CTA buttons)

### Code
[component code here]

### Testing
- Hover smoothness at 60fps
- Works on touch devices (disable magnetic on mobile)
- Focus state visible on keyboard tab
```

---

## Reference Sites — Interaction Patterns to Emulate

**mokn.io:**
- Cinematic hero with scroll-triggered reveals
- Typography that scales/fades on scroll
- Magnetic nav links and CTA buttons
- Smooth Lenis scrolling

**estrela.studio:**
- High-contrast black/white with accent colors
- Bold typography (large headers, tight tracking)
- Minimal layout with strong visual hierarchy
- Fade + scale transitions between pages

**aurigaspace.com:**
- 3D globe/scene in hero
- Spatial parallax (foreground moves faster)
- Smooth transitions between sections
- Subtle ambient animations (particles, gradients)

**planpoint-webgpu.vercel.app:**
- WebGPU-powered 3D visualization
- Progressive loading (fallback to 2D)
- High performance (60fps constant)
- Technical sophistication in effects

**ds-k.site:**
- Micro-interactions on every element
- Hover states with magnetic pull
- Icon animations (rotate, translate on hover)
- Smooth section transitions with pinning

---

## Quick Reference: Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14+ / Vite | Build, routing, SSR/SSG |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS / CSS Modules | Rapid styling, design tokens |
| Motion | GSAP + ScrollTrigger | Scroll-driven animations |
| Transitions | Framer Motion | Component/page transitions |
| Smooth Scroll | Lenis | Premium smooth scrolling |
| 3D | React Three Fiber + Drei | Optional 3D scenes |
| WebGPU | Three.js WebGPU backend | Advanced graphics (fallback) |

**Current baseline:** Preserve color palette (`#e0a3ff`, `#ff69b4`, etc.) and glassmorphism aesthetic while upgrading interaction sophistication.

---

## Migration Priority

1. **Phase 1** (Foundation): Setup Next.js, convert HTML to React components
2. **Phase 2** (Motion): Implement Lenis + GSAP scroll animations
3. **Phase 3** (Interactions): Build magnetic buttons, hover states, micro-interactions
4. **Phase 4** (Polish): Page transitions, accessibility, performance optimization
5. **Phase 5** (Advanced): Add 3D scenes if beneficial to storytelling

Start with Phase 1. AI agents should always ask for clarification if the implementation approach is ambiguous.
