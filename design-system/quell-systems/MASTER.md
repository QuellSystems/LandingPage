# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Quell Systems
**Generated:** 2026-08-05 16:05:01
**Category:** B2B Service
**Design Dials:** Variance 7/10 (Balanced / Modern) | Motion 8/10 (Complex) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette

> **OVERRIDE:** la hoja de identidad de Quell Systems (Dirección C — "El Módulo") es la
> fuente de verdad. Reemplaza la paleta genérica que sugirió el motor de búsqueda.

| Role | Hex | CSS Variable | Origen |
|------|-----|--------------|--------|
| Primary (navy) | `#12263F` | `--color-primary` | Marca |
| On Primary | `#F7F8F9` | `--color-on-primary` | Marca |
| Secondary (slate) | `#7C8FA8` | `--color-secondary` | Marca |
| Accent/CTA | `#12263F` | `--color-accent` | Marca (el CTA es navy sólido, no un color extra) |
| Background | `#F7F8F9` | `--color-background` | Marca |
| Surface | `#FFFFFF` | `--color-surface` | Derivado |
| Foreground | `#12263F` | `--color-foreground` | Marca |
| Muted fg | `#5A6B80` | `--color-muted-foreground` | Derivado (7.0:1 sobre #F7F8F9) |
| Muted bg | `#EDF0F3` | `--color-muted` | Derivado |
| Border | `#DDE3EA` | `--color-border` | Derivado |
| Ring | `#7C8FA8` | `--color-ring` | Marca |

**Color Notes:** Navy + slate + off-white. Tres colores, cero gradientes de marca.
El acento no es un cuarto color: es el contraste navy sobre off-white. La jerarquía
la construye el peso tipográfico y el espacio, no la saturación.

**Regla de uso del slate `#7C8FA8`:** solo para superficies, bordes, el módulo del
logo y texto sobre navy. **Nunca** como texto sobre `#F7F8F9` (da 2.6:1, falla AA).
Para texto secundario sobre claro usar `--color-muted-foreground` `#5A6B80`.

### Typography

> **OVERRIDE:** tipografías de marca, no las que sugirió el motor.

- **Heading / logotipo:** Space Grotesk (300–700)
- **Body:** Space Grotesk
- **Mono — datos, etiquetas, código, eyebrows:** IBM Plex Mono (400–500)
- **Mood:** técnico, editorial, preciso, de ingeniería, sin adornos
- **Google Fonts:** [Space Grotesk + IBM Plex Mono](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap)

El mono no es decorativo: marca todo lo que es **dato o metadato** (kickers de sección,
números de stats, labels de formulario, badges). Es la firma visual de la marca — la
misma lógica que la hoja de identidad usa en `LOCKUPS`, `ESCALABILIDAD`, `#12263F`.

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

> **Radio de esquina:** el logo usa `rx 26/84 ≈ 0.31` en el contenedor y `rx 12/38 ≈ 0.32`
> en el módulo. Ese ratio (~0.3) es la firma de forma de la marca. Botones y cards lo heredan:
> radio generoso pero **no** pill. Botón de 44px de alto → `border-radius: 14px`.

```css
/* Primary Button — navy sólido */
.btn-primary {
  background: #12263F;
  color: #F7F8F9;
  padding: 13px 26px;
  border-radius: 14px;
  font-weight: 500;
  transition: background 200ms ease, transform 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1B3556;
  transform: translateY(-1px);
}

/* Secondary Button — borde fino, no 2px */
.btn-secondary {
  background: transparent;
  color: #12263F;
  border: 1px solid #DDE3EA;
  padding: 13px 26px;
  border-radius: 14px;
  font-weight: 500;
  transition: border-color 200ms ease, background 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #7C8FA8;
  background: #EDF0F3;
}
```

### Cards

```css
/* Sin sombra por defecto: la separación la da el borde, como la hoja de identidad */
.card {
  background: #FFFFFF;
  border: 1px solid #DDE3EA;
  border-radius: 18px;
  padding: 28px;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  border-color: #7C8FA8;
  box-shadow: 0 1px 2px rgba(18, 38, 63, 0.04);
}
```

### Inputs

```css
.input {
  padding: 13px 16px;
  border: 1px solid #DDE3EA;
  border-radius: 14px;
  font-size: 16px; /* 16px evita el zoom automático en iOS */
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.input:focus-visible {
  border-color: #12263F;
  outline: none;
  box-shadow: 0 0 0 3px rgba(124, 143, 168, 0.35);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Trust & Authority

**Keywords:** Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition, security badges

**Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services

**Key Effects:** Badge hover effects, metric pulse animations, certificate carousel, smooth stat reveal

### Page Pattern

**Pattern Name:** Trust & Authority + Conversion

- **Conversion Strategy:** Security badges. Case studies. Transparent pricing. Low-friction form.
- **CTA Placement:** Contact Sales / Get Quote (primary) + Nav
- **Section Order:** 1. Hero (mission/credibility), 2. Proof (logos, certs, stats), 3. Solution overview, 4. Clear CTA path

---

## Motion

**Page Transition** (Complex) — Trigger: route change | Duration: 500-800ms | Easing: `expo.inOut`

```js
const state = Flip.getState('.hero-image'); navigate(); Flip.from(state, { duration: 0.6, ease: 'expo.inOut', absolute: true, zIndex: 100 });
```

**Framework notes:** Requires the GSAP Flip plugin; the 'from' and 'to' route must render the same element with a shared data-flip-id

- ✅ Verify the shared element exists in both DOM states before calling Flip.from to avoid a silent no-op
- ❌ Don't use shared-element transitions across more than one element pair per navigation; compounding Flips are hard to time correctly
- ⚡ Flip recalculates layout (FLIP technique) so test on low-end devices for jank

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Regla "que no parezca IA"

El look genérico de landing generada tiene una firma reconocible. Prohibido:

- ❌ Gradiente violeta/índigo/rosa en cualquier parte (blob, glow, borde, texto)
- ❌ Fondo con aurora, nebulosa, orbes flotantes, shader de ruido, partículas
- ❌ Glassmorphism sobre fondo oscuro con blur alto y borde blanco al 20%
- ❌ Texto con `bg-clip-text` degradado en el H1
- ❌ Emojis como iconos de feature (🚀 ⚡ 🎯) — Lucide, siempre
- ❌ Copy de relleno: "Transformá tu negocio con soluciones de vanguardia"
- ❌ Cards de feature idénticas 3×, todas con el mismo icono en círculo de color pastel
- ❌ Logos de clientes inventados como formas genéricas grises

En su lugar, lo que hace que se lea como diseñado por una persona:

- ✅ Asimetría deliberada en el grid (bento con celdas de peso distinto, no 2×3 parejo)
- ✅ Detalle mono en labels/números — cuesta de fingir, se lee como decisión editorial
- ✅ Números concretos y verificables, no "+1000 clientes felices"
- ✅ Una sola idea de movimiento sostenida, no un efecto distinto por sección
- ✅ Reglas de 1px y kickers numerados (`01 / PROBLEMA`) al estilo de la hoja de identidad
- ✅ Densidad de texto real: párrafos de 2–3 líneas con contenido, no una frase suelta

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
