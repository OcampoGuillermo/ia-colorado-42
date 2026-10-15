# Lente DIA — AURA + ROOT (Paso 3)

Lente de realidad aumentada: imprimís la lámina, la enfocás con el celular y aparece tu humano digital.

## Archivos
- `lamina.html` — fuente de la lámina (A4, alto contraste, lista para imprimir a PDF)
- `lamina.png` — lámina raster para imprimir y para compilar el marcador
- `index.html` — la Lente DIA (MindAR image tracking + video o .glb)
- `proyecto.json` — configuración del proyecto
- `targets.mind` — **lo generás vos en 2 minutos** (ver abajo)
- `video.mp4` — **tu video del Paso 1 o 2** (renombralo así junto al index)

## 1. Generar targets.mind (obligatorio, 2 min)
MindAR necesita la lámina compilada. Desde aquí no puedo compilarla, se hace online:
1. Abrí https://hiukim.github.io/mind-ar-js-doc/tools/compile
2. Subí `lamina.png`.
3. Descargá `targets.mind` y subilo junto a `index.html`.

## 2. Lámina en PDF
Abrí `lamina.html` en Chrome → Ctrl+P → destino "Guardar como PDF" → A4 vertical → márgenes ninguno. O imprimí directo en A4 color, papel mate.

## 3. Video
Copiá tu `42_Apellido_Nombre_Paso1.mp4` (o Paso 2) como `video.mp4` junto al index. Si sale mudo en el celular, tocá "Activar sonido".

## 4. Publicar (https obligatorio)
Repo público → subir `index.html + lamina.png + targets.mind + video.mp4` → Settings → Pages → Deploy from branch `main/(root)`.
Abrir en el celular: `https://TU_USUARIO.github.io/TU_REPO/lente-aura-root/` → Abrir cámara → permitir → enfocar la lámina impresa.

## 5. Grabar entrega Paso 3
Con el otro dispositivo grabá 20-40s donde se vea la lámina impresa y el personaje apareciendo. Nombre: `42_Apellido_Nombre_Paso3`.
Subir: PNG/PDF de lámina + MP4 + enlaces GitHub Pages (humano, escenario y lente).

## Si algo falla
- Cámara no abre: tiene que ser https + permiso de cámara.
- No reconoce: más luz, sin reflejos, lámina plana, marcador con detalle (esta tiene guardas, esquinas y texturas a propósito).
- Error con targets.mind: recompilalo con la PNG exacta que imprimiste.
