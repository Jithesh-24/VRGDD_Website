# VRG DESIGN DEN — Studio Website

Single-page marketing site for VRG DESIGN DEN, an architecture, landscape and
interior design studio in Chennai.

Plain HTML, CSS and JavaScript. **No build step and no dependencies to install** —
the repository root is what gets served.

## Running locally

ES modules need a real HTTP origin, so open the site through a server rather than
double-clicking `index.html`:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

Any static server works (`npx serve`, VS Code Live Server, `netlify dev`).

> `assets/js/security.js` locks the page to `localhost`, `127.0.0.1` and
> `*.netlify.app`. Serving from any other hostname replaces the page with a
> "Development Preview Mode" notice — add the hostname to `allowedHosts` there
> when the site moves to its production domain.

## Layout

```
index.html                  All page markup, sections numbered in document order
favicon.ico                 Served from the root by convention
netlify.toml                Deploy config: publish root, security + cache headers

assets/
├── css/
│   ├── base/               Design tokens, reset, base typography
│   ├── components/         Reusable pieces: buttons, cursor, preloader,
│   │                       header, marquee, lightbox, toast
│   ├── sections/           One file per page section
│   └── utilities/          Scroll-reveal helpers
├── js/
│   ├── security.js         Domain lock + devtools guard (classic script)
│   ├── main.js             Entry module; calls every init on DOMContentLoaded
│   └── modules/            One module per feature, each exporting an init()
└── images/
    ├── brand/              Logos and favicons
    ├── projects/           Portfolio images, named after the project
    ├── slides/             Hero background slideshow
    ├── categories/         Category card artwork
    └── content/            Section backgrounds and photography
```

### Stylesheets

`index.html` links each stylesheet individually. **The link order is the cascade
order** — later files intentionally override earlier ones, so keep new sheets in
their group and add section sheets in document order.

### Scripts

Every module exports a single `init*()` function that looks up its own DOM nodes
and returns early when they are absent, so sections can be added or removed
without touching the other modules. Register new features by importing them in
`assets/js/main.js` and calling the init inside the `DOMContentLoaded` handler.

`gsap`, `ScrollTrigger` and `Lenis` load from CDNs as globals and are always
feature-detected with `typeof` before use — the site degrades to CSS transitions
and native scrolling if a CDN is unreachable.

## Third-party services

| Service | Used for |
| --- | --- |
| Font Awesome 6.4 (cdnjs) | Icons |
| Google Fonts | Montserrat, Inter, Cormorant Garamond, Playfair Display |
| GSAP 3.12 + ScrollTrigger (cdnjs) | Scroll-triggered reveals |
| Lenis 1.0.19 (jsDelivr) | Momentum scrolling |
| FormSubmit | Contact form delivery to `info@vrgdesignden.com` |
| Google Maps embed | Studio location |

## Deployment

Netlify builds nothing and publishes the repository root. Pushing to the default
branch is the deploy.
