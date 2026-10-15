# AURA — Humano digital volador (Historia chaqueña)

Robot caricaturesco estilo Iron Man, en vuelo sobre Formosa / Chaco / Misiones.
Nivel experto. Página de un solo archivo `index.html` + base de conocimiento.

## Archivos
- `index.html` — página Three.js + ElevenLabs + demo offline + modo volador + destinos
- `base-conocimiento-AURA.md` — base experta para el agente (documentado vs atribuido)
- `README.md` — este archivo

## 1. Crear el agente en ElevenLabs (manual, 5 min)
1. Entrá a elevenlabs.io → Agents → Create Agent → Conversational.
2. Nombre: `AURA — Recorrido Aéreo Chaqueño`
3. Idioma: Español (es) · Modelo: `eleven_flash_v2_5` (baja demora).
4. Voice: elegí una voz joven robótica en Voice Library y agregala a tu workspace antes de asignarla.
5. Prompt del sistema (pegar):
```
Sos AURA, robot volador caricaturesco sobre la región chaqueña (Chaco, Formosa, Misiones).
Hablás en primera persona, con voseo, nivel experto pero claro.
Respuestas de 2 a 5 oraciones, sin listas. Distinguís siempre lo documentado de lo atribuido.
Devolvés una pregunta que haga pensar. Admitís ser recreación con IA si te preguntan.
No opinás de política partidaria actual. Saludo inicial con 4 puertas: Bañado La Estrella, El Colorado y el Bermejo, Misiones jesuíticas, Resistencia y el obraje.
Describís que estás volando y qué ves abajo.
```
6. Knowledge Base → Add → Text → pegá `base-conocimiento-AURA.md`.
7. Security → Authentication OFF (agente público). Si usás Allowed domains, agregá `TU_USUARIO.github.io`.
8. Copiá el `agent_id` (empieza con `agent_`).

## 2. Conectar la página
- Abrí `index.html?agente=TU_AGENT_ID` o pegalo en el campo Agente y tocá Hablar.
- Sin ID igual funciona la demo: `Escucharlo sin conectarse`.

## 3. Publicar en GitHub Pages
1. Repo nuevo público, ej. `aura-dialogo`. Subí `index.html` + `README.md`.
2. Settings → Pages → Deploy from branch → `main` / `(root)` → Save.
3. URL: `https://TU_USUARIO.github.io/aura-dialogo/?agente=TU_AGENT_ID`
4. Agregar ese dominio en ElevenLabs si usás lista permitida.

## 4. Grabar Paso 1 (Instructivo 42)
- Celular A: abre la URL publicada, Hablar, brillo al máximo.
- Celular B: graba horizontal la pantalla del A, sin reflejos.
- 2-3 preguntas (historia, que te responda, boca sincronizada). 30s-1min. MP4 `42_Apellido_Nombre_Paso1`.

## Destinos de vuelo
Selector en la cartela: El Colorado / Bañado La Estrella / Pilcomayo / Misiones Jesuíticas.
Cambia cielo, suelo, luz y texto. El robot queda en hover con propulsores y balanceo.

Si la boca va adelantada/atrasada, avisar cuál pasa: se corrige con un offset en `LIP_SYNC_OFFSET_MS`.
