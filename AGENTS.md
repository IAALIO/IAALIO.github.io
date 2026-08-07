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
- Variables de entorno (VITE_FORM_API, etc.) definidas en `.github/workflows/deploy.yml` y en `.env`
- **IMPORTANTE:** `.env` y `.github/workflows/deploy.yml` deben tener el MISMO `VITE_FORM_API`
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
│   │   ├── Navbar.jsx                  # Logo IAA + navegación + toggle idioma
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

## Navbar — Contactos (REMOVIDOS 2026-08-06)
- Los iconos de WhatsApp y Email fueron **eliminados** de la navbar (desktop y móvil)
- WhatsApp: `wa.me/584244296940` — **ya no aparece en el sitio**
- Email: `license.international.official@gmail.com` — **ya no aparece en el sitio**
- El contacto es ahora solo vía el formulario de solicitud del sitio web

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
- [ ] Revisar T&C con abogado, decidir jurisdicción final
- [ ] Traducir T&C al inglés completo
- [ ] Bloquear países de riesgo alto en formulario (opcional)

### Bugs históricos (resueltos)
- [x] **2026-07-21: Google Sheets CSV DNS failure** - Google DNS (8.8.8.8) dejó de resolver `doc-XX-XX-sheets.googleusercontent.com`.
      Solución: migrar de CSV a AppsScript + JSONP.
      `AppsScript.gs`: `doGet(?action=licencias&callback=fn)` sirve JSONP.
      `SearchLicense.jsx` y `AdminPanel.jsx`: usan `jsonp()` en vez de `fetch(CSV)`.

## Bitácora 2026-08-06 (sesión actual)
### Cambios de código (commit `b8e679f`, pusheado a main)
- **Panel de búsqueda/verificación arreglado:**
  - `SearchLicense.jsx` y `AdminPanel.jsx`: cache-buster `&_=Date.now()` en el JSONP para evitar que el navegador cachee la respuesta (causaba mostrar solo 4 registros viejos)
  - **Eliminado el fallback a `public/data/licencias.json`** (dato estático viejo con solo 4 licencias — ya no se usa)
  - Se añadió reintento (1 vez) y estado de error con botón "Reintentar" en ambos componentes
- **Contactos personales removidos del sitio** (privacidad):
  - `Navbar.jsx`: eliminados iconos WhatsApp (`wa.me/584244296940`) y Email (`mailto:license.international.official@gmail.com`)
  - `Footer.jsx`: eliminados email + teléfono `+58 4244296940`
  - `TermsModal.jsx`: cláusulas 20 y 49 (ES/EN) ahora dicen "a través del formulario de solicitud del sitio web"
- **Precios removidos → "Consultar Precio"**:
  - `translations.js`: eliminado `price`, agregada clave `consultPrice` (ES/EN), testimonio con precio ajustado
  - `Pricing.jsx`: muestra "Consultar Precio" con link a `#tramite`
  - `UrgencyBar.jsx`: CTA sticky sin precios
  - `ApplicationForm.jsx`: opciones de vigencia sin $70/$100/$150
- Build local verificado OK (Node via `node_modules/vite/bin/vite.js build`; instalado `@rolldown/binding-win32-x64-msvc --no-save` porque node_modules venía de Linux)

### Git (instalado el 06-08)
- Git 2.55.0.3 instalado vía winget → `C:\Program Files\Git\cmd\git.exe` (NO está en PATH)
- `npm.ps1` bloqueado por ExecutionPolicy → usar `npm.cmd` o node directo

### Workflow / Deploy (commits `fedc985`, `2718e6d`, `15bac29`)
- Agregado `workflow_dispatch:` bajo `on:` en `.github/workflows/deploy.yml` (permite disparo manual)
- Token nuevo (classic PAT, scopes repo+workflow, owner `licenseinternationalofficial`) puesto en la URL del remote; el fine-grained anterior daba 403 al push
- Runs intentados: #59 (cancelado) y #60 (quedó en cola)

### Incidente global de GitHub (NO es problema del proyecto)
- **2026-08-06: Major Outage en GitHub Actions y Pages** (15:22 UTC→~22:18+ UTC, recuperación en curso)
- Causa de: pushes que no disparaban el workflow (webhooks throttled ~15%) y runs "queued" por horas
- Última actualización: 97% de éxito, runners drenando cola. Nada que hacer, esperar.
- Cuando se recupere, verificar el run #60 o re-despachar manualmente

### Limpieza de archivos muertos (mismo día)
- **Borrado `public/data/licencias.json`** (archivo muerto con datos personales reales de clientes — ya no se usa, el panel usa AppsScript live)
- **Borrado restos de Netlify** (verificado que GitHub Pages no los usa): `netlify.toml`, `public/_redirects`, `public/forms.html`, y la línea `VITE_API_URL=/.netlify/functions` en `.env` y `.env.example`

### Pendiente tras la sesión
- [x] Verificar deploy #64: **exitoso** — el sitio muestra "Consultar Precio"/"Check Price", sin contactos ni precios

### Mejoras visuales + fixes admin (misma sesión, último commit)
- **Hero — marquee infinito de banderas**: las 24 banderas rotan en loop continuo (`translateX(-50%)`, duplicadas), con máscara de desvanecido en los bordes, pausa al hover y `prefers-reduced-motion`. Los logos IAA/ONU/FIA quedan estáticos arriba. (CSS: `.marquee-track`, `.marquee-mask`)
- **Anclas**: `section[id] { scroll-margin-top: 6rem }` para que la navbar fija no tape los destinos al navegar por hash (Inicio → formulario, etc.)
- **Nav renombrado**: "Precios" → "Planes" (ES) / "Plans" (EN) en `translations.js`
- **Efectos visuales**:
  - Barra de progreso de scroll (roja, brillo) en la parte superior de la navbar (`Navbar.jsx`)
  - Navbar glass al hacer scroll: `bg-primary/85 backdrop-blur-md` + borde inferior (`Navbar.jsx`)
  - Botones `btn-primary` con degradado `#cf2e2e→#a31212`, shadow rojo y barrido de brillo al hover (CSS)
  - `btn-outline` con degradado al hover; cards con glow rojo sutil al hover (CSS)
  - CTAs principales migrados a `btn-primary`: Hero, Navbar (desktop+móvil), Pricing (popular), Testimonials, DocumentShowcase, FAQ, Requirements, StickyMobileCTA, botón "Siguiente" del formulario
- **AdminPanel fixes**:
  - Buscador: ahora es **substring + case-insensitive** y busca por **documento, ID trámite y nombre** (antes solo igualdad exacta, por eso "no encontraba")
  - Modal de detalle: nuevo wrapper `overflow-y-auto` + `min-h-full` + `my-auto` para que **nunca se salga de pantalla** y haga scroll interno en pantallas pequeñas o contenido largo
- Build verificado OK
- **Deploy**: se disparará con este push (run nuevo, tras la recuperación del incidente)

## CSV DNS Issue (Resuelto)

**Problema:** Google Sheets publicado como CSV redirige a `doc-XX-XX-sheets.googleusercontent.com`
que los DNS de Google (8.8.8.8) y Cloudflare (1.1.1.1) **no resuelven** (SERVFAIL).
Quad9 (9.9.9.9) sí lo resuelve correctamente.
Esto causó que la búsqueda de licencias dejara de funcionar el 21/07/2026.

**Solución:** Reemplazar el CSV por la API de Google Apps Script con JSONP:
- `AppsScript.gs` → `doGet()` ahora acepta `?action=licencias&callback=Fn`
  y devuelve JSONP con los datos de la pestaña **Licencias** del sheet `19tfesoT1l...`
- `doPost()` ahora acepta `action: 'add-license'` para agregar licencias directo al Sheet
- El frontend usa la función `jsonp()` (crea `<script>` tag dinámico) para evitar CORS
- AdminPanel ya no copia líneas CSV al portapapeles, envía POST directo al sheet

### Columnas de la pestaña "Licencias" (en sheet 19tfesoT1l...)
| Header en Sheet | Clave en JSON |
|----------------|---------------|
| Documento | documento |
| ID Tramite | id_tramite |
| Nombre | nombre |
| Vencimiento | vencimiento |
| Estado | estado |
| Categoria | categoria |
| Licencia | licencia |
| Fecha Nacimiento | fecha_nacimiento |
| Nacionalidad | nacionalidad |
| Estatura | estatura |
| Tipo Sangre | tipo_sangre |
| Color Ojos | color_ojos |
| Foto URL | foto_url |
| Pais Valido | pais_valido |
| Firma | firma |
| Cedula | cedula |

### Si el DNS de Google vuelve a fallar
La solución es JSONP + Apps Script, no CSV. Si Google cambia algo:
1. No tocar el CSV URL - ya no se usa
2. Verificar que `VITE_FORM_API` apunte al deployment correcto del Apps Script
3. Probar con `curl -sL -H "Host: doc-10-00-sheets.googleusercontent.com" --resolve "doc-10-00-sheets.googleusercontent.com:443:142.250.154.132" "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcLOEKNE8N8-dRiH9ZhFxxbpK59mSE8gc-Of1wya6QH6HuOQvs1l6pFnxM35HoUhUsOCI12p03n5YY/pub?output=csv"`

## Instrucciones para futuras modificaciones
1. **Siempre leer AGENTS.md primero** antes de tocar cualquier archivo
2. **Variables de entorno:** Solo hay 2 activas: `VITE_FORM_API` y `VITE_ADMIN_PASSWORD`
3. `VITE_CSV_URL` ya **no se usa** - toda la data de licencias viene del AppsScript
4. **AppsScript** está en `AppsScript.gs` → hay que copiarlo manualmente a `script.google.com`
5. **Deploy:** `npm run build && git add . && git commit -m "..." && git push`
6. **Archivos del proyecto lio-new/** son los que están en producción en `iaalio.github.io`
7. `Lio-web-main/` es la versión vieja, **no modificar**
8. Si la búsqueda de licencias falla: revisar `VITE_FORM_API` en `.env` y en `.github/workflows/deploy.yml`
9. Si se modifica `AppsScript.gs`: desplegar nueva versión en script.google.com, copiar URL nueva, actualizar `VITE_FORM_API`
10. No hardcodear tokens ni contraseñas en el código - usar variables de entorno

## Comandos útiles
```bash
npm run dev        # Desarrollo local
npm run build      # Build producción
git push           # Trigger deploy
```
