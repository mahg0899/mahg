---
name: styling-mahg-frontend
description: >-
  Use when adding, changing, or reviewing public UI styling in MAHG.me
  (app/(frontend), header, footer, blog cards, rich text, media gallery,
  contact form): Tailwind v4, globals.css, bento-card, btn-primary, --btnColor,
  Lucide, Simple Icons, BrandIcon, or Spanish copy. Also use when about to add
  Font Awesome, styles.css, a CSS module, styled-components, Emotion, inline
  color styles, or a hardcoded hex that bypasses the theme tokens.
---

# Estilo del frontend público (MAHG.me)

El sitio público ya está en Tailwind CSS v4. La fuente de tema es `app/(frontend)/globals.css`. Las pantallas se componen con utilidades de Tailwind y dos utilidades propias: `bento-card` y `btn-primary`.

`app/(frontend)/styles.css` no existe y no se importa. No lo recrees.

Payload Admin (`app/(payload)/`, `app/(payload)/custom.scss`, `components/admin/`, `components/Dashboard.tsx`, `components/CustomNavHeader.tsx`) es otra superficie: CSS propio e `style={{}}`. No copies ese patrón al sitio público y no le apliques `bento-card`.

## Dónde va cada estilo

| Qué | Dónde |
|---|---|
| Tokens, `bento-card`, `btn-primary`, overrides de Plyr | `app/(frontend)/globals.css` |
| Layout, color, tipo, responsive de una pantalla | `className` en el componente |
| Fuentes (variables CSS) | `next/font` en `app/(frontend)/layout.tsx` |
| Iconos de interfaz | `lucide-react` |
| Iconos de marca | `simple-icons` vía `components/BrandIcon.tsx` |
| Imágenes OG (`next/og`, Satori) | `style={{}}` obligatorio en ese renderer; copia el hex del token, no inventes otra paleta |

Entrada de Tailwind: `@import "tailwindcss"` en `globals.css` y `@tailwindcss/postcss` en `postcss.config.mjs` (`tailwindcss` ^4). El layout público y `app/not-found.tsx` importan solo `globals.css`.

## Tokens

Definidos en `:root` y mapeados en `@theme inline`. Usa la utilidad, no el hex.

| Variable | Utilidad | Valor | Uso |
|---|---|---|---|
| `--background` | `bg-background` | `#101922` | Fondo de página |
| `--foreground` | `text-foreground` | `#F0E7D5` | Color base del `body` |
| `--textMain` | `text-main` | `#F8FAFC` | Texto principal |
| `--btnColor` | `bg-btn` `text-btn` `border-btn` | `#2D8BFF` | Acento azul |
| `--bento` | `bg-bento` | `#1c2127` | Relleno de tarjeta |
| `--contrast` | `bg-contrast` `border-contrast` | `#1D2835` | Superficie secundaria, divisores |

Escala de tipo extra en `@theme` (pisa los defaults de Tailwind en 4xl):

| Clase | Tamaño |
|---|---|
| `text-4xs` | 0.625rem |
| `text-3xs` | 0.75rem |
| `text-2xs` | 0.875rem |
| `text-4xl` | 2.5rem |
| `text-5xl` | 3rem |

Texto apagado que ya usa el sitio: escala `slate` de Tailwind (`text-slate-500` labels, `text-slate-400` cuerpo secundario, `text-slate-100` títulos de servicio). En UI nueva de la misma zona, repite ese escalón. No añadas otro gris en hex.

Acento con alpha: `bg-btn/20`, `text-btn`, `border-btn`, `hover:border-btn`. Mezclas en CSS nuevo: `color-mix(in oklab, var(--btnColor) …)`.

## Componentes

Contenedor de página (header, footer, home, about, blog, portfolio, contact):

```tsx
<div className="mx-auto w-11/12 xl:w-6/10">
```

Tarjeta bento. El hover (borde, sombra y elevación con `--btnColor`) ya está en la utilidad; no lo reescribas en el componente.

```tsx
<div className="bento-card group p-6">
  <p className="text-2xs font-bold uppercase tracking-widest text-slate-500">Etiqueta</p>
  <h2 className="font-inter font-black text-main">Título</h2>
</div>
```

Botón principal:

```tsx
import { Mail } from "lucide-react"

<Link href="/contact" className="btn-primary">
  <Mail className="size-5" />
  Contactame
</Link>
```

Home: `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`. Revisa mobile, `md` y `lg`. El header muestra nav en `md+` y el panel en `md:hidden`.

Tipografía: el `body` usa `var(--font-inter)`, luego Geist. Títulos de sección: `font-inter font-black`. Wordmark del header: `font-bitcount`. `font-orbitron` está cargada en el layout y mapeada en `@theme`, y ninguna pantalla pública la usa; no la metas en UI nueva. Mono de código: `font-mono` / Geist Mono.

## Iconos

Dos familias. No mezcles una tercera.

**Interfaz** (nav, acciones, estados, flechas, mail, calendario): `lucide-react`. Importa el componente por nombre desde `lucide-react`. No uses rutas profundas (`lucide-react/dist/esm/icons/...`): pierden tipos.

```tsx
import { Mail } from "lucide-react"

<Mail className="size-5 shrink-0 text-btn" />
```

El color lo da el padre (`text-btn`, `text-slate-400`, `group-hover:text-white`). No pongas `color` ni `stroke` en el icono. Tamaños ya usados: `size-5` en botones y filas de contacto, `size-4` en controles compactos, `size-3` en chips y labels de about. Un icono decorativo grande lleva la clase de tamaño en el propio componente (`size-35`, `text-6xl`), no un `style`. Spinner de envío: `LoaderCircle` con `animate-spin`.

En una lista, guarda el componente y renderízalo. Tipa el campo como `LucideIcon`.

```tsx
import { Book, type LucideIcon } from "lucide-react"

const items: { name: string; icon: LucideIcon }[] = [
  { name: "Libros", icon: Book },
]

items.map((item) => <item.icon className="size-3" />)
```

**Marcas** (GitHub, LinkedIn, X, Figma y el resto de logos): `simple-icons` más `BrandIcon` de `components/BrandIcon.tsx`. El identificador es `si` + PascalCase (`siGithub`, `siLinkedin`, `siX`, `siFigma`). `BrandIcon` dibuja el `path` a 24×24 con `fill="currentColor"`.

```tsx
import { siGithub } from "simple-icons"
import { BrandIcon } from "@/components/BrandIcon"

<BrandIcon icon={siGithub} className="size-4 text-slate-400 group-hover:text-white" />
```

No uses los logos de Lucide ni `@fortawesome/free-brands-svg-icons` para marcas. No importes `@fortawesome/react-fontawesome` ni renderices `FontAwesomeIcon`. Si el archivo que tocas aún lo tiene, sustituye ese icono en el mismo cambio.

Copy de interfaz en español. `<html lang="es">`. No traduzcas labels existentes al inglés.

Plyr: solo dentro de `.plyr-wrapper` en `globals.css`. `--plyr-color-main` sigue en `var(--btnColor)`.

## Color que no es el tema

Déjalo en hex solo cuando el color es de una marca ajena, no de MAHG:

- Tech stack en `app/(frontend)/page.tsx` (`tech.color` + máscara CSS). El `style` existe para pintar el SVG; el color es el de React, Next, Tailwind, etc.
- Hover de Figma en `app/(frontend)/portfolio/page.tsx`: `hover:text-[#F24E1E]`.
- OG en `app/(frontend)/blog/[slug]/opengraph-image.tsx`, `app/api/og/[slug]/route.tsx` y `lib/og-static.tsx`. Satori no lee las clases de `globals.css`. Si cambias `--btnColor`, actualiza el `#2D8BFF` de esas tres plantillas a mano.

## Restos sin migrar

La refactorización está parcial. Al tocar estos archivos, pasa el layout y el color de MAHG a utilidades o a un `@utility` en `globals.css`. No copies el bloque inline a otro componente.

| Archivo | Qué quedó | Al extenderlo |
|---|---|---|
| `components/RichText/index.tsx` (`CodeBlock`, `highlightLine`) | Paleta GitHub (`#0d1117`, `#79c0ff`, …) y layout en `style={{}}`. Lo renderiza el post en `blog/[slug]`. | El chrome del bloque (radio, borde, fondo) puede usar `bg-bento`, `border-main/25`, `rounded-xl`, `font-mono`. Los colores de sintaxis pueden quedarse locales; no los subas a `--btnColor`. |
| `components/ImageGallery.tsx` | `<style>` con `.gallery-grid-*` más `borderRadius` y el lightbox `rgba(0,0,0,0.94)`. Ya usa `bg-bento` y `focus:ring-btn`. | Grid con `grid-cols-1 sm:grid-cols-2 lg:grid-cols-*` y `gap-*`. No añadas otro `<style>`. |
| `components/BackToBlogButton.tsx` | Botón entero en inline style (`#2563eb` / `#1d4ed8`). Ningún archivo lo importa. | Si vuelve a usarse: `className="btn-primary"`. Ese azul no es `--btnColor`. |
| `app/(frontend)/blog/[slug]/page.tsx` | `text-[#F8FAFC]` en el `h1` | `text-main` |
| `app/(frontend)/contact/page.tsx` | Gradiente de puntos con `#ffffff1a` / `#000` en la clase arbitraria | Déjalo si solo retocas copy. Un fondo nuevo usa `bg-background` / `bg-btn/*`. |
| `globals.css` (bloque Plyr) | Menús y tooltips en hex (`#1e293b`, `#e2e8f0`) junto a `--btnColor` | El acento del player sigue siendo `var(--btnColor)`. |
| `page.tsx` (home), `portfolio/page.tsx`, `components/header.tsx`, `components/footer.tsx`, `contact/page.tsx`, `contact/ContactForm.tsx` | `FontAwesomeIcon` todavía en el JSX. Contacto y el header ya importan Lucide o Simple Icons, pero varios nodos siguen en Font Awesome. | UI → componente de `lucide-react`. Marca → `BrandIcon` + `si*`. Quita el import de Font Awesome cuando ya no quede ningún uso en el archivo. |

`style={{}}` que no es color de tema y puede quedarse: `clipPath` del 404, `paddingLeft` dinámico en `components/TableOfContents.tsx`, y la animación de opacidad en `components/BlogPostsGrid.tsx`.

## Al añadir UI

1. Marca el componente con utilidades existentes (`bento-card`, `btn-primary`, `text-btn`, `bg-bento`, `text-main`, `slate-*` ya usado al lado).
2. Si el mismo patrón se repite en más de una pantalla, añade un `@utility` en `globals.css` que use `var(--btnColor)` o las variables hermanas. No abras otro archivo CSS.
3. Un color de marca MAHG nuevo entra primero en `:root` y en `@theme inline`, y después se usa como utilidad (`bg-*` / `text-*`).
4. No edites `payload-types.ts`, `media/`, `.next/`, `node_modules/`, `.env` ni `*.tsbuildinfo`. El contenido de textos de blog, proyectos y SEO sale de Payload; no lo hardcodees para “cuadrar” un estilo.
