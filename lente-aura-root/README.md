# IA al Colorado · Instructivo N.º 42 — AURA + ROOT

Humanos digitales voladores sobre Formosa, escenario multiagente y lente de realidad aumentada.

**Materia:** Prácticas Profesionalizantes · **Carrera:** Auxiliar en IA 2026 · **Instituto:** ISFD y T «República Federal de Alemania», El Colorado, Formosa · **Docente:** Prof. Ariel Cóceres
**Repo:** https://github.com/OcampoGuillermo/ia-colorado-42

**Páginas publicadas (GitHub Pages):**

| Página | Enlace |
|---|---|
| Paso 1 · AURA (humano digital) | https://ocampoguillermo.github.io/ia-colorado-42/aura-dialogo/ |
| Paso 2 · AURA + ROOT (escenario) | https://ocampoguillermo.github.io/ia-colorado-42/escenario-aura-root/ |
| Paso 3 · Lente DIA (realidad aumentada) | https://ocampoguillermo.github.io/ia-colorado-42/lente-aura-root/ |

> Las tres páginas funcionan en el celular. El micrófono y la cámara exigen **https** (por eso se publican en Pages, no sirve abrir el archivo suelto).

## Personajes

| | AURA | ROOT |
|---|---|---|
| Qué es | Robot voladora estilo Iron Man caricaturesco | Niño doctor con anteojos, rostro suavizado |
| Rol | Historia de la región chaqueña (Chaco, Formosa, Misiones), nivel experto | Inteligencia artificial y tecnología + territorio chaqueño desde sensores, drones y datos, nivel experto |
| Habla | Primera persona, con voseo | Primera persona, con voseo |
| Agente ElevenLabs | `agent_8301m50tb78effcsq2q0jfhxgm6y` | `agent_2701m50vk6p4ed1a26b4shgzf6wb` |
| Base de conocimiento | `aura-dialogo/base-conocimiento-AURA.md` | `escenario-aura-root/base-conocimiento-ROOT.md` |

Ambos admiten ser recreaciones con IA si se lo preguntan, distinguen lo documentado de lo atribuido y devuelven una pregunta que hace pensar.

## Estructura del repo

```
ia-colorado-42/
├── README.md                      ← este archivo
├── aura-dialogo/                  ← PASO 1
│   ├── index.html                 ← página del humano digital (Three.js + ElevenLabs)
│   ├── base-conocimiento-AURA.md   ← historia chaqueña experta
│   └── README.md                  ← cómo crear el agente y publicar
├── escenario-aura-root/           ← PASO 2
│   ├── index.html                 ← set 3D multiagente + cine + YouTube
│   ├── base-conocimiento-ROOT.md   ← IA/tech + territorio
│   └── README.md
└── lente-aura-root/               ← PASO 3
    ├── index.html                 ← Lente DIA (MindAR)
    ├── lamina.html / lamina.png / lamina.pdf
    ├── gen_lamina.mjs / gen_pdf.mjs (generadores, no se suben obligatorios)
    ├── proyecto.json
    ├── targets.mind               ← SE GENERA ONLINE (ver Paso 3)
    ├── video.mp4                  ← TU VIDEO del Paso 1/2 (agregarlo)
    └── README.md
```

## Paso 1 · Humano digital AURA (`aura-dialogo/`)

Un personaje 3D que conversa por voz: escucha por micrófono, responde con el agente de ElevenLabs y mueve boca, ojos, cejas y brazos al ritmo de la voz.

- **Cuerpo:** robot procedural en Three.js 0.160 (casco, reactor, propulsores), en hover con balanceo de vuelo. Giro 360° con OrbitControls + botón «Volver al frente» (0,9 s). La mirada sigue a quien la rodea.
- **Sincronía:** SDK `@elevenlabs/client` 1.26.0 + alineación letra por letra (`chars`, `char_start_times_ms`) → visemas A / E-I / O-U / M-B-P con coarticulación + Web Audio (AnalyserNode) para apertura y silencios.
- **Vuelo con satélite real:** suelo con imágenes Esri World Imagery (sin key). Ciudades: Formosa capital, El Colorado, Clorinda, Pirané, Las Lomitas, Bañado La Estrella, San Ignacio Miní. Se viaja escribiendo la ciudad, con el selector, o **diciéndolo por voz** («Volemos a Clorinda») gracias a la client-tool `viajar_a_ciudad` (agregarla en ElevenLabs con parámetro `ciudad`).
- **Demo sin conexión:** botón «Escucharlo sin conectarse» (voz del dispositivo, Web Speech). Sirve para practicar sin gastar créditos.
- **Probar:** abrir la página → Hablar → permitir micrófono → 2-3 preguntas (historia, respuesta personal, boca sincronizada).
- **Video entrega:** MP4 horizontal 30 s–1 min, grabado con un 2.º dispositivo apuntando a la pantalla (brillo al máximo, sin reflejos). Archivo: `42_Apellido_Nombre_Paso1`.

## Paso 2 · Escenario multiagente AURA + ROOT (`escenario-aura-root/`)

Dos humanos digitales conversando en un set 3D aéreo con cámaras de cine. Requiere los dos agentes funcionando.

- **En vivo:** botones Conectar AURA / Conectar ROOT (sesiones ElevenLabs independientes), modo Duelo (los dos responden), detector de ciudades por voz + campo «Volar», selector de lugar. Todo lo que dicen aparece subtitulado.
- **Idea → Guion:** escribís la idea y el lugar de Formosa, genera un guion AURA (historia) + ROOT (tecnología) listo para cine.
- **Capítulo 16:9 / Short 9:16:** reproducen el guion con voz local (sin créditos), cámaras automáticas (amplia, close AURA, close ROOT, cenital, vertical) y subtítulos.
- **Secuencia para video:** botón «hablan primero, después viajan» — presentan, viajan al destino con satélite real y cierran sobre la ciudad. Es la toma lista para grabar.
- **YouTube:** genera título, descripción, etiquetas y miniatura (captura del 3D) descargable.
- **Video entrega:** MP4 16:9 o 9:16 (charla en vivo o pequeña historia). Archivo: `42_Apellido_Nombre_Paso2`.

## Paso 3 · Lente de realidad aumentada (`lente-aura-root/`)

Imprimís la lámina, la enfocás con el celular y aparece tu humano digital.

- **Lámina:** `lamina.png` (794×1123, alto contraste con guardas y esquinas, optimizada para tracking) + `lamina.pdf` (vectorial A4) + `lamina.html` (fuente reimprimible).
- **Lente:** `index.html` con MindAR 1.2.5: al detectar la lámina muestra `video.mp4` flotando (o el `.glb` en Modo 3D). Botones Abrir cámara / Activar sonido.
- **Generar `targets.mind` (obligatorio, 2 min):** https://hiukim.github.io/mind-ar-js-doc/tools/compile → subir `lamina.png` → descargar `targets.mind` → subirlo junto al index.
- **Impresión:** A4 color, papel mate (el brillante refleja). Buena luz, lámina plana, sin reflejos al enfocar.
- **Video entrega:** 20–40 s donde se vea la lámina impresa y el personaje apareciendo + archivos PNG/PDF. Archivo: `42_Apellido_Nombre_Paso3`.

## Publicación en GitHub Pages

1. Repo público `ia-colorado-42` → Add file → Upload files (límite web 25 MB por archivo; `video.mp4` debe entrar o comprimirse a 720p).
2. Settings → Pages → Source: Deploy from a branch → `main` + `/(root)` → Save. Esperar 1–2 min.
3. URLs: `https://TU_USUARIO.github.io/ia-colorado-42/<carpeta>/`.
4. En ElevenLabs → cada agente → Security: autenticación OFF (público); si hay Allowed domains, agregar `TU_USUARIO.github.io`.
5. Para actualizar: subir el archivo con el mismo nombre → Commit → republica solo.

## Entrega (Instructivo 42)

| Qué | Formato | Nombre |
|---|---|---|
| Video Paso 1 (AURA responde) | MP4 horizontal 30 s–1 min | `42_Apellido_Nombre_Paso1` |
| Video Paso 2 (charla o historia) | MP4 16:9 o 9:16 | `42_Apellido_Nombre_Paso2` |
| Lámina + video Paso 3 (AR) | PNG/PDF + MP4 | `42_Apellido_Nombre_Paso3` |
| Enlaces publicados | 3 URLs de GitHub Pages | en la entrega |

## Si algo falla

| Problema | Qué hacer |
|---|---|
| No habla / no conecta | Agente público (Security OFF) + dominio en Allowed domains + https + permiso de micrófono |
| `voice_not_found` | Agregar la voz desde Voice Library al workspace y reasignarla |
| Cámara no abre | https + permiso (🔒 barra → Cámara → Permitir); iPhone: Ajustes → Safari → Cámara |
| No reconoce la lámina | Más luz, sin reflejos, lámina plana; recompilar `targets.mind` con la PNG exacta impresa |
| 404 en Pages | Esperar 2 min; el archivo debe llamarse `index.html`; respetar mayúsculas |
| Boca adelantada/atrasada | Avisar cuál pasa: se corrige con `LIP_SYNC_OFFSET_MS` |

## Uso ético

Transparencia (son recreaciones con IA y lo dicen), consentimiento (nada de clonar voces/caras sin permiso, nada de deepfakes), datos personales Ley 25.326 (la voz viaja a ElevenLabs), respeto cultural (fuentes y comunidad en saberes pilagá/qom), costos (cada minuto consume créditos; usar la demo offline para practicar). Alineado con UNESCO Ética de la IA (2021).

Stack: Three.js 0.160 · ElevenLabs Conversational AI SDK 1.26.0 · MindAR 1.2.5 · Esri World Imagery · Web Audio · Web Speech. Una página por carpeta, sin build.
