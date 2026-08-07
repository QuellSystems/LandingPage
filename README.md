# Quell Systems — Landing

Next.js 16 · React 19 · Tailwind v4 · Motion 13 · Lenis

```bash
npm run dev
```

## Cómo se tomaron las decisiones de diseño

El design system salió de la skill `ui-ux-pro-max`, con la hoja de identidad de
marca sobrescribiendo color y tipografía. Todo está en
[`design-system/quell-systems/MASTER.md`](design-system/quell-systems/MASTER.md).

Para regenerarlo o explorar alternativas:

```bash
python "C:/Users/cache/.claude/skills/ui-ux-pro-max/scripts/search.py" "enterprise erp custom software trust authority navy corporate" --design-system --variance 7 --motion 8 --density 4
```

Lo que la skill definió y se respetó:

| Salida de la skill | Aplicación |
|---|---|
| Patrón `Trust & Authority + Conversion` | Orden de secciones: hero → prueba → solución → CTA |
| Patrón `Scroll-Triggered Storytelling` | Kickers numerados `01`–`06` + barra de progreso de scroll |
| Motion tier `Complex` (8/10) | Scrub atado al scrollbar, no timers |
| `Scroll Reveal / Standard`: y 24, 400–600ms, stagger 0.08 | `components/ui/reveal.tsx` — primitiva única de toda la página |
| Anti-patrón `AI purple/pink gradients` | Regla ampliada en MASTER.md §"que no parezca IA" |
| Density 4/10 | Escala de espaciado estándar (16–64px) |

Lo que se sobrescribió, y por qué: la skill propuso `#1E3A8A` + `#B45309` con
Lexend/Source Sans 3. La hoja de identidad manda — navy `#12263F`, slate
`#7C8FA8`, off-white `#F7F8F9`, Space Grotesk + IBM Plex Mono.

## Componentes de 21st.dev

Portados a mano desde [21st.dev/community/components](https://21st.dev/community/components),
adaptados a los tokens de marca. Ninguno entró sin cambios.

| Componente | Autor original | Archivo | Adaptación |
|---|---|---|---|
| Container Scroll Animation | ui layout / Manu Arora | `ui/container-scroll.tsx` | rotateX 22° en vez de 45° (la maqueta tiene que leerse); desactivado <768px |
| Scroll and Swap Text / Text Reveal | Daniel Petho, Cnippet | `ui/scroll-reveal-text.tsx` | Arranca en opacidad 0.18, no en 0 |
| Text Highlighter | Daniel Petho | `ui/text-highlighter.tsx` | Slate al 30% en vez de amarillo; una sola vez en toda la página |
| Text Rotate | Daniel Petho | `ui/text-rotate.tsx` | Ancho reservado con copia invisible (evita CLS en el H1) |
| Number Ticker | Daniel Petho / Dillion Verma | `ui/number-ticker.tsx` | Escribe en `textContent`, sin setState por frame; valor real en el HTML del server |
| Marquee | Dillion Verma (magicui) | `ui/marquee.tsx` | CSS puro, sin JS en el loop; listado `sr-only` aparte |
| Progressive Blur | Dillion Verma / Julien Thibeaut | `ui/progressive-blur.tsx` | 6 capas en los bordes del marquee |
| Spotlight Card | Berkcan Gümüşışık | `ui/spotlight-card.tsx` | Ilumina el **borde** en navy, no el relleno con glow de color |
| Scroll Progress | Cnippet / Ali Imam | `ui/scroll-progress.tsx` | 2px navy |

## Estructura de la página

| # | Sección | Archivo | Qué hace |
|---|---|---|---|
| — | Hero | `sections/hero.tsx` | "Tu sistema ya existe. Está repartido en ___" |
| — | Clientes | `sections/clients.tsx` | Marquee con blur progresivo |
| 01 | Diagnóstico | `sections/problem.tsx` | Cuatro síntomas cruzando los tres rubros |
| 02 | Servicios | `sections/services.tsx` | A medida · los tres productos · web |
| 03 | Productos | `sections/platform.tsx` | Supply / Clinic / Coach conmutables por tabs |
| 04 | Cómo trabajamos | `sections/capabilities.tsx` | Diferenciales comunes a todo servicio |
| 05 | Proceso | `sections/process.tsx` | Timeline con línea dibujada por scroll |
| 06 | Resultados | `sections/proof.tsx` | Stats + testimonios de los tres rubros |
| 07 | Contacto | `sections/contact.tsx` | Formulario con selector de servicio |

Las tres maquetas de la sección 03 viven en `sections/platform-mockups.tsx` y
comparten el mismo `MockupShell` a propósito: es la misma base con distinto
dominio encima, y mostrarlo así lo comunica sin tener que escribirlo.

## Productos

| Producto | Rubro | Maqueta |
|---|---|---|
| **Quell Supply** | Abastecimiento — compras, stock, despachos | Órdenes de compra con avance de recepción |
| **Quell Clinic** | Salud — consultorios y centros | Ficha de paciente, evoluciones, stock de insumos |
| **Quell Coach** | Fitness — entrenadores y estudios | Grilla semanal de mesociclo, adherencia por alumno |

Los tres usan el mismo lockup que la marca madre (`quell` semibold + sufijo en
IBM Plex Mono), generado por `<QuellLockup suffix="clinic" />`. Compartir la
construcción exacta es lo que los hace leer como familia y no como tres marcas
sueltas — si aparece un cuarto producto, sale del mismo componente.

## Pendiente antes de publicar

- [ ] **Logos de clientes** — `sections/clients.tsx` tiene 9 nombres placeholder
- [ ] **Testimonios** — `sections/proof.tsx` tiene nombres "Nombre Apellido"
- [ ] **Métricas** — los números de `proof.tsx` y `capabilities.tsx` son plausibles pero inventados
- [ ] **Funciones de cada producto** — los bullets de `sections/services.tsx` son plausibles; confirmá que coincidan con lo que Supply, Clinic y Coach hacen hoy
- [ ] **Subdominios** — las maquetas muestran `supply/clinic/coach.quellsystems.com`; confirmá que sea el esquema real
- [ ] **Formulario** — `sections/contact.tsx` sólo hace `preventDefault`; falta cablearlo a un endpoint o CRM
- [ ] **Datos de contacto** — email y ubicación son de ejemplo
- [ ] **Precios de las suscripciones** — no hay sección de pricing; si el abono es público conviene agregarla
- [ ] Favicon PNG/ICO además del SVG, y og-image
