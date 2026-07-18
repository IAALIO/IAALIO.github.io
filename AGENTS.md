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
- **GitHub Token:** classic, scope `repo`+`workflow` (token no guardado en repo, pedir al usuario)
- **Admin password:** `LIO-ADMIN-2024`
- **Apps Script proyecto:** `IAA-Form-API-v2` en https://script.google.com
- **Email notificaciones:** `license.international.official@gmail.com`

## Deploy (GitHub Pages + Actions)
- **Push a `main`** → GitHub Actions build con Node 22 → deploy a Pages
- Workflow: `.github/workflows/deploy.yml`
- `base: './'` en vite.config.js para rutas relativas
- `index.html` copiado a `404.html` para SPA routing
- Variables de entorno (VITE_FORM_API, etc.) definidas en el workflow
- El push necesita token en remote URL: `git remote set-url origin https://USER:TOKEN@github.com/IAALIO/IAALIO.github.io.git`

## Estructura del Proyecto
```
lio-new/
├── .github/workflows/deploy.yml       # Build + deploy automático
├── public/
│   ├── favicon.png                     # Logo IAA
│   ├── success.html                    # Página posterior al envío
├── src/
│   ├── assets/images/
│   │   ├── iaa-logo.png                # Logo IAA (PNG)
│   │   ├── un-logo.png                 # Logo ONU (PNG)
│   │   ├── fia-logo.png                # Logo FIA (PNG, fondo transparente)
│   │   ├── licencia-frente.png         # Fotos ejemplo documentos
│   │   ├── licencia-dorso.png
│   │   ├── folleto-traduccion.png
│   │   └── package-completo.png
│   ├── components/
│   │   ├── Navbar.jsx                  # Logo IAA + navegación + iconos WhatsApp/Email
│   │   ├── Hero.jsx                    # Hero con logos IAA/UN/FIA
│   │   ├── Footer.jsx                  # Footer con disclaimer translucent text
│   │   ├── UrgencyBar.jsx              # Badge "IAA · ONU · FIA"
│   │   ├── ApplicationForm.jsx         # Formulario 4 pasos + T&C checkbox + TermsModal
│   │   ├── TermsModal.jsx              # Modal con 50 cláusulas T&C (ES/EN)
│   │   ├── SearchLicense.jsx           # Consulta licencias + PDF con jsPDF
│   │   ├── Pricing.jsx                 # Planes con botón "Aplicar"
│   │   ├── TrustBadges.jsx             # Sellos de confianza
│   │   ├── CounterSection.jsx          # Contador animado
│   │   ├── Testimonials.jsx            # Testimonios (scroll horizontal en móvil)
│   │   ├── DocumentShowcase.jsx        # Galería de documentos (scroll horizontal en móvil)
│   │   ├── HowItWorks.jsx              # Pasos del trámite
│   │   ├── Requirements.jsx            # Requisitos
│   │   ├── FAQ.jsx                     # Preguntas frecuentes
│   │   ├── AdminPanel.jsx              # Dashboard (password, CSV, búsqueda)
│   │   └── StickyMobileCTA.jsx         # CTA fijo inferior en móvil
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
- Muestra detalle de cada licencia (vencimiento, datos físicos, foto, firma, cédula)
- Exporta CSV completo
- Genera líneas CSV para agregar nuevas licencias (copia al portapapeles)
- **Contraseña:** `LIO-ADMIN-2024`

### Columnas del CSV (licencias emitidas)
| # | Columna | Descripción |
|---|---------|-------------|
| 0 | Documento | N° de documento |
| 1 | ID Tramite | ID del trámite |
| 2 | Nombre | Nombre completo |
| 3 | Vencimiento | Fecha de vencimiento |
| 4 | Estado | ACTIVA / EXPIRADA |
| 5 | Categoria | Categoría de licencia |
| 6 | LINK | URL foto licencia local |
| 7 | Fecha Nac | Fecha de nacimiento |
| 8 | Nacionalidad | Nacionalidad |
| 9 | Estatura | Altura en cm |
| 10 | Sangre | Tipo de sangre |
| 11 | Ojos | Color de ojos |
| 12 | Foto URL | URL foto carnet |
| 13 | Pais Valido | País de validez |
| 14 | Firma | URL foto firma |
| 15 | Cedula | URL foto cédula/ID |

## PDF (SearchLicense.jsx)
- jsPDF v4.2.1 con `GState` para watermark
- **Logos:** Se cargan como data URLs via `loadImgDataUrl()` — SVGs convertidos a PNG via canvas, PNGs via blob→base64
- **Watermark:** Logo IAA al centro con opacidad 15% (120×70mm)
- **Header bilingüe:** "INTERNATIONAL DRIVING PERMIT / PERMISO INTERNACIONAL DE CONDUCIR" (font 14/8/7)
- **Campos:** 11 campos (Holder, DOB, Nationality, Height, Blood Type, Eye Color, Document N°, Application ID, Category, Valid Until, Status) con font 8, lineH 6
- **Foto carnet:** 35×42mm a la derecha, desde Googleusercontent
- **Documentos adjuntos:** Solo Licencia + Cédula (sin firma), thumbnails 48×32mm centrados
- **Firma:** Centrada (50×18mm), con nombre + N° documento debajo
- **Cláusulas legales:** Convención Ginebra 1949, Viena 1968 (font 7/6.5, compacto)
- **Footer logos:** IAA/UN/FIA a 14×14mm (todos igual tamaño)
- **Salida:** `doc.output('bloburl')` → `window.open` (nueva pestaña)
- Cada sección con try-catch individual

## Términos y Condiciones (TermsModal.jsx)
- Modal con overlay semitransparente, scrollable, max-h 85vh
- 50 cláusulas en ES/EN, incluyendo: definición del producto (tarjeta de traducción), naturaleza no gubernamental, aceptación, elegibilidad, veracidad, fotos, logos, propiedad intelectual, licencia limitada, obligaciones, usos prohibidos, limitación de responsabilidad, sin garantías, indemnización, privacidad (GDPR-style), reembolsos, reemplazos, envío, aduanas, fuerza mayor, ley aplicable (Panamá), disputas, reclamos, terminación, suspensión, cesión, severabilidad, comunicaciones electrónicas, fraudes, costos legales, firmas digitales, limitación de daños, no endoso gubernamental, traducción informativa

### Integración en el formulario
- Paso 4: checkbox "Acepto los Términos y Condiciones" con link que abre el modal
- Validación: botón "Enviar" requiere checkbox marcado
- Estado: `acceptedTerms` (boolean) en ApplicationForm.jsx

## Footer Disclaimer
- Texto bilingüe en `text-white/15` (15% opaco), font 6px
- Declara: "La tarjeta IAA es un producto de traducción... no es un documento gubernamental... no reemplaza la licencia nacional"
- `select-none` para que no se seleccione accidentalmente

## Navbar — Contactos
- Iconos WhatsApp (`MessageCircle`) y Email (`Mail`) en la navbar desktop, al lado del toggle de idioma
- Color `text-white/40`, hover `text-white`
- En móvil, aparecen en el menú hamburguesa antes del CTA
- WhatsApp: `wa.me/584244296940`
- Email: `license.international.official@gmail.com`
- El WhatsAppButton flotante fue eliminado

## Mobile Responsive
- **Testimonios:** Scroll horizontal con `snap-x snap-mandatory`, cada card `min-w-[85vw]` (uno por vez)
- **DocumentShowcase:** Scroll horizontal en móvil, cards `w-[85vw]`, en desktop grid 2 columnas
- Badges (9 Idiomas/QR/Respaldo) fuera del grid, visibles en ambos

## Logos
- Reemplazados de SVG a PNG (carpeta `~/Descargas/logos/`)
- FIA logo con fondo transparente
- Cards en Hero con `bg-gray-600/20` para mejor contraste del logo FIA

## Términos borrador
- Archivo: `~/Documentos/BORRADOR-TERMINOS-Y-CONDICIONES.md` (50 cláusulas)
- Pendiente: revisar con abogado, decidir jurisdicción (Panamá sugerida)

## Funcionalidad de colores
- **Primary:** `#0d132d` (azul marino)
- **Accent:** `#cf2e2e` (rojo)
- **Bg section:** `#fbfbfb` (blanco hueso)

## Estado del proyecto
### Completado
- [x] Sitio completo con branding IAA/UN/FIA
- [x] Paleta azul+rojo+blanco
- [x] Formulario multi-step con fotos
- [x] Google Apps Script desplegado y funcional (v2)
- [x] Formulario envía datos a Sheet + Drive + email
- [x] Fotos organizadas en subcarpetas por solicitante
- [x] CORS resuelto con `mode: 'no-cors'`
- [x] GitHub Pages + Actions deploy automático
- [x] AdminPanel funcional (CSV, búsqueda, exportación, firma/cédula)
- [x] Placeholders descriptivos y formato DD/MM/AAAA
- [x] PDF compacto en una página, logo/data URL loading, watermark 15%
- [x] Firma centrada con nombre + documento, thumbnails 48×32 sin firma duplicada
- [x] Logos PNG reemplazados (IAA, UN, FIA), FIA con fondo transparente
- [x] Cards Hero con fondo gris claro para visibilidad FIA
- [x] Testimonios y documentos scroll horizontal en móvil (85vw snap)
- [x] Modal T&C con 50 cláusulas + checkbox en paso 4 + validación
- [x] Disclaimer en footer (texto 6px, 15% opaco)
- [x] "100% Legal" reemplazado por "Avalado / Endorsed"
- [x] Checkbox simplificado: solo "Acepto Términos y Condiciones"
- [x] Contactos WhatsApp/Email en Navbar (iconos, sin flotante)
- [x] Firma removida de la tarjeta visual de resultados (solo en PDF)
- [x] Cards Licencia + Cédula centradas en escritorio (flex row) y móvil (flex col)

### Pendiente
- [ ] Dominio propio (opcional, ~$10/año)
- [ ] Probar consulta de licencias (depende del CSV)
- [ ] Revisar T&C con abogado, decidir jurisdicción final
- [ ] Traducir T&C al inglés completo
- [ ] Bloquear países de riesgo alto en formulario (opcional)

## Comandos útiles
```bash
npm run dev        # Desarrollo local
npm run build      # Build producción
git push           # Trigger deploy
```
