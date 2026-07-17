# IAA Project Documentation

## URLs
| Recurso | URL |
|---------|-----|
| **Sitio web** | https://IAALIO.github.io/ |
| **GitHub org** | https://github.com/IAALIO |
| **GitHub repo** | https://github.com/IAALIO/IAALIO.github.io |
| **Admin panel** | https://IAALIO.github.io/#admin |
| **Form API (Apps Script)** | `https://script.google.com/macros/s/AKfycbx0gQ3CD231T3oX69LQ7PJ-JdC7KB4fx0LUKoOdyMiJ93rcwV60gf31mAikekc0vj--/exec` |
| **CSV público (licencias)** | `https://docs.google.com/spreadsheets/d/e/2PACX-1vQcLOEKNE8N8-dRiH9ZhFxxbpK59mSE8gc-Of1wya6QH6HuOQvs1l6pFnxM35HoUhUsOCI12p03n5YY/pub?output=csv` |
| **Google Sheet (solicitudes)** | `19tfesoT1l-k9ee2d9R2u-qmUUGNlkrQ-soPcltI21QI` |
| **Drive folder (fotos)** | `1sAgajm3yoK2g0Y5w9a1ZqbnJGcWqWcac` (IAA-Licencias) |

## Credenciales
- **GitHub Token:** classic, scope `repo`+`workflow` (token actual guardado localmente, no en el repo)
- **Admin password:** `LIO-ADMIN-2024`
- **Apps Script proyecto:** `IAA-Form-API-v2` en https://script.google.com
- **Email notificaciones:** `license.international.official@gmail.com`

## Deploy (GitHub Pages + Actions)
- **Push a `main`** → GitHub Actions build con Node 22 → deploy a Pages
- Workflow: `.github/workflows/deploy.yml`
- `base: './'` en vite.config.js para rutas relativas
- `index.html` copiado a `404.html` para SPA routing
- Variables de entorno (VITE_FORM_API, etc.) definidas en el workflow

## Estructura del Proyecto
```
lio-new/
├── .github/workflows/deploy.yml       # Build + deploy automático
├── public/
│   ├── favicon.png                     # Logo IAA
│   ├── success.html                    # Página posterior al envío
├── src/
│   ├── assets/images/
│   │   ├── iaa-logo.png                # Logo IAA 1080x1078
│   │   ├── un-logo.svg                 # Logo ONU
│   │   ├── fia-logo.svg                # Logo FIA
│   │   ├── licencia-frente.png         # Fotos ejemplo documentos
│   │   ├── licencia-dorso.png
│   │   ├── folleto-traduccion.png
│   │   └── package-completo.png
│   ├── components/
│   │   ├── Navbar.jsx                  # Logo IAA + navegación
│   │   ├── Hero.jsx                    # Hero con logos IAA/UN/FIA
│   │   ├── Footer.jsx                  # Footer con logo IAA
│   │   ├── UrgencyBar.jsx              # Badge "IAA · ONU · FIA"
│   │   ├── ApplicationForm.jsx         # Formulario 4 pasos → base64 → JSON → no-cors
│   │   ├── SearchLicense.jsx           # Consulta licencias + PDF con jsPDF
│   │   ├── Pricing.jsx                 # Planes con botón "Aplicar"
│   │   ├── TrustBadges.jsx             # Sellos de confianza
│   │   ├── CounterSection.jsx          # Contador animado
│   │   ├── Testimonials.jsx            # Testimonios
│   │   ├── DocumentShowcase.jsx        # Galería de documentos
│   │   ├── HowItWorks.jsx              # Pasos del trámite
│   │   ├── Requirements.jsx            # Requisitos
│   │   ├── FAQ.jsx                     # Preguntas frecuentes
│   │   ├── AdminPanel.jsx              # Dashboard (password, CSV, búsqueda)
│   │   └── WhatsAppButton.jsx          # Flotante WhatsApp
│   ├── data/translations.js            # ES/EN bilingüe
│   └── App.jsx                         # Layout + ruteo (#admin)
├── index.html                          # Title: "IAA - License International Official"
├── vite.config.js                      # base: './'
├── AppsScript.gs                       # Código del Google Apps Script
└── AGENTS.md                           # Este archivo
```

## Google Apps Script (IAA-Form-API-v2)
**Ubicación:** https://script.google.com (proyecto `IAA-Form-API-v2`)

### Funcionamiento
1. Frontend envía POST con `mode: 'no-cors'` (evita CORS)
2. Google redirige a script.googleusercontent.com (echo)
3. Script procesa los datos:
   - Crea subcarpeta `LIC-YYYYMMDD-HHmmss` dentro de `IAA-Licencias`
   - Guarda las 4 fotos (carnet, firma, ID, licencia) en esa subcarpeta
   - Agrega fila al Sheet `IAA-Solicitudes` → pestaña `Aplicantes`
   - Envía email a `license.international.official@gmail.com`
4. Frontend redirige a `success.html` independientemente de la respuesta

### Si se necesita modificar
1. Ir a https://script.google.com → abrir `IAA-Form-API-v2`
2. Editar código
3. **Deploy** → **Manage deployments** → lápiz → **New version** → **Deploy**
4. Copiar nueva URL y actualizar `VITE_FORM_API` en `.github/workflows/deploy.yml`

## AdminPanel
**Acceso:** `/#admin` en el sitio

### Qué hace
- Lee licencias del CSV público de Google Sheets
- Busca por nombre, ID o trámite
- Muestra detalle de cada licencia (vencimiento, datos físicos, foto)
- Exporta CSV completo
- Genera líneas CSV para agregar nuevas licencias (copia al portapapeles)
- **Contraseña:** `LIO-ADMIN-2024`

### Nota
El AdminPanel es independiente del formulario de solicitudes. El formulario envía datos al Apps Script (Sheet de solicitudes + Drive), mientras que el AdminPanel consulta un CSV de licencias ya emitidas.

## PDF (SearchLicense.jsx)
- jsPDF v4.2.1
- Watermark IAA al centro (opacidad 15%)
- Header bilingüe español/inglés
- Foto del aplicante (40x48mm) desde Googleusercontent
- Cláusulas legales: Convención Ginebra 1949, Viena 1968
- Footer con logos IAA/UN/FIA
- Cada sección con try-catch individual

## Funcionalidad de colores
- **Primary:** `#0d132d` (azul marino)
- **Accent:** `#cf2e2e` (rojo)
- **Bg section:** `#fbfbfb` (blanco hueso)

## Estado del proyecto
### Completado
- [x] Sitio completo con branding IAA/UN/FIA
- [x] Paleta azul+rojo+blanco
- [x] Formulario multi-step con fotos
- [x] PDF con watermark, foto, cláusulas legales
- [x] Google Apps Script desplegado y funcional (v2)
- [x] Formulario envía datos a Sheet + Drive + email
- [x] Fotos organizadas en subcarpetas por solicitante
- [x] CORS resuelto con `mode: 'no-cors'`
- [x] GitHub Pages + Actions deploy automático
- [x] AdminPanel funcional (CSV, búsqueda, exportación)
- [x] Placeholders descriptivos y formato DD/MM/AAAA

### Pendiente
- [ ] Revisar PDF (foto y watermark visualmente)
- [ ] Dominio propio (opcional, ~$10/año)
- [ ] Probar consulta de licencias (depende del CSV)
- [ ] Token GitHub (classic, no expira)

## Comandos útiles
```bash
npm run dev        # Desarrollo local
npm run build      # Build producción
git push           # Trigger deploy
```
