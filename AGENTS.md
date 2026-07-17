# LIO → IAA Project Documentation

## URLs
- **Site:** https://IAALIO.github.io/
- **GitHub Org:** https://github.com/IAALIO
- **GitHub Repo:** https://github.com/IAALIO/IAALIO.github.io
- **Dominio anterior (Netlify):** licenseinternationalofficial.netlify.app (sin créditos)

## Credenciales
- **GitHub Token:** `ghp_xxxx` (classic, repo + workflow scope — saved in AGENTS.md local)
- **Google Apps Script URL:** `https://script.google.com/macros/s/AKfycbx0BP-n-yHe2PGEGjmpQRKdm72VdQ-Yo095qMCnIPP7T5xoSs4AW6ki4XVaHUwcW_-X/exec`
- **Drive Folder ID (IAA-Licencias):** `1sAgajm3yoK2g0Y5w9a1ZqbnJGcWqWcac`
- **Google Sheet ID (IAA-Solicitudes):** `19tfesoT1l-k9ee2d9R2u-qmUUGNlkrQ-soPcltI21QI`
- **VITE_ADMIN_PASSWORD:** `LIO-ADMIN-2024`
- **Google Sheets CSV (público):** `https://docs.google.com/spreadsheets/d/e/2PACX-1vQcLOEKNE8N8-dRiH9ZhFxxbpK59mSE8gc-Of1wya6QH6HuOQvs1l6pFnxM35HoUhUsOCI12p03n5YY/pub?output=csv`

## Deploy
- **Plataforma:** GitHub Pages (gratis, ilimitado)
- **Auto-deploy via GitHub Actions** en cada push a `main`
- Workflow: `.github/workflows/deploy.yml` — build con Node 22, copia `index.html` a `404.html` (SPA routing), deploy a Pages
- Se activó Actions como Source en Settings → Pages

## Estructura del Proyecto
```
lio-new/
├── .github/workflows/deploy.yml    # GitHub Actions deploy
├── public/
│   ├── favicon.png                  # Logo IAA como favicon
│   ├── favicon.svg                  # (viejo, no usado)
│   ├── success.html                 # Página post-submit
│   └── forms.html                   # (Netlify legacy)
├── src/
│   ├── assets/images/
│   │   ├── iaa-logo.png             # Logo IAA 1080x1078 (alta resolución)
│   │   ├── un-logo.svg              # Logo ONU oficial (vector)
│   │   ├── fia-logo.svg             # Logo FIA (vector texto)
│   │   ├── licencia-frente.png      # Foto ejemplo documento
│   │   ├── licencia-dorso.png       # Foto ejemplo documento
│   │   ├── folleto-traduccion.png   # Foto ejemplo documento
│   │   └── package-completo.png     # Foto ejemplo documento
│   ├── components/
│   │   ├── Navbar.jsx               # Logo IAA como marca, sin filter
│   │   ├── Hero.jsx                 # IAA, UN, FIA logos en trust card
│   │   ├── Footer.jsx               # Logo IAA + texto
│   │   ├── UrgencyBar.jsx           # Badge "IAA · ONU · FIA"
│   │   ├── ApplicationForm.jsx      # Formulario multi-step con fotos → base64 → JSON
│   │   ├── SearchLicense.jsx        # Consulta CSV + PDF generation
│   │   ├── Pricing.jsx              # Planes con botón "Aplicar"
│   │   ├── TrustBadges.jsx          # Badges de confianza
│   │   ├── CounterSection.jsx       # Contador de licencias
│   │   ├── Testimonials.jsx         # Testimonios
│   │   ├── DocumentShowcase.jsx     # Muestra fotos de documentos reales
│   │   ├── HowItWorks.jsx           # Pasos
│   │   ├── Requirements.jsx         # Requisitos
│   │   ├── FAQ.jsx                  # Preguntas frecuentes
│   │   ├── AdminPanel.jsx           # Panel admin (descarga CSV)
│   │   └── WhatsAppButton.jsx       # Botón flotante WhatsApp
│   ├── data/translations.js         # ES/EN textos
│   └── App.jsx                      # Layout principal
├── index.html                       # Title "IAA - License International Official"
├── vite.config.js                   # base: './' para GitHub Pages
├── netlify.toml                     # (legacy, no usado)
├── AppsScript.gs                    # Google Apps Script para forms
└── AGENTS.md                        # Este archivo
```

## Paleta de Colores
- **Primary:** `#0d132d` (azul marino oscuro)
- **Accent:** `#cf2e2e` (rojo)
- **Bg section:** `#fbfbfb` (blanco hueso)

## PDF Generation (SearchLicense.jsx:73-208)
- **Librería:** jsPDF v4.2.1
- **Watermark:** Logo IAA al centro con GState opacity 0.15
- **Header:** Título bilingüe, "IAA - License International Official", "Avalado por IAA · ONU · FIA"
- **Cuerpo:** Campos del aplicante a la izquierda (x=20), foto 40x48mm a la derecha (x=148)
- **Legal clauses:** Base legal con Convención Ginebra 1949, Viena 1968, ONU, FIA
- **Footer:** Logos IAA, UN, FIA lado a lado + texto de cierre
- **Foto:** Fetch desde lh3.googleusercontent.com → blob → base64 → addImage
- **On error:** Cada sección con try-catch individual, nunca bloquea el PDF

## Formulario (ApplicationForm.jsx)
- 4 pasos: datos personales, físicos, fotos, contacto
- Envío: Convierte fotos a base64, envía JSON a `VITE_FORM_API` con `mode: 'no-cors'` (CORS fix)
- **AppsScript.gs:** Recibe JSON, guarda en Google Sheet, sube fotos a Drive, envía email
- Email envuelto en try-catch (falla silenciosamente si no hay sesión activa)
- **Proyecto Apps Script:** IAA-Form-API-v2 (script.google.com)

## Estado Actual (Completado)
- [x] Paleta azul+blanco+rojo (latinolicencias.com)
- [x] Logo IAA como marca principal (Navbar, Footer)
- [x] Hero con IAA, UN, FIA visibles en móvil y desktop
- [x] Textos "Avalado por IAA · ONU · FIA" en toda la page
- [x] DocumentShowcase con fotos reales
- [x] Payment: Binance primero, PayPal, Zelle, Bancos Int/Locales
- [x] Botón "Aplicar" en pricing
- [x] WhatsApp flotante (no en CTAs)
- [x] PDF con watermark IAA, foto aplicante, cláusulas legales
- [x] PDF footer con logos IAA, UN, FIA
- [x] GitHub Pages deploy via Actions
- [x] 404.html para SPA routing
- [x] Favicon IAA
- [x] Title "IAA - License International Official"
- [x] Google Apps Script desplegado (v2) con Drive/Sheet/email
- [x] CORS solucionado (no-cors mode en fetch)
- [x] Token GitHub renovado y funcional

## Pendiente
- [ ] **Pegar código final en IAA-Form-API-v2 y desplegar** (AppsScript.gs en unblock.txt)
- [ ] **Autorizar doPost y doGet** desde el editor de script.google.com
- [ ] **Probar formulario** en https://IAALIO.github.io (esperar deploy de GitHub Actions)
- [ ] Revisar PDF: asegurar que foto y watermark se vean bien
- [ ] Dominio propio (opcional, ~$10/año)
- [ ] Probar que la consulta de licencias funciona (depende del CSV de Google Sheets)
- [ ] El token de GitHub vence? (classic, no expira)

## Comandos útiles
```bash
npm run dev      # Desarrollo local
npm run build    # Build producción
git push         # Trigger deploy
```
