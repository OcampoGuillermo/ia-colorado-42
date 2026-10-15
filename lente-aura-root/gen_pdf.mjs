// Genera lamina.pdf A4 vectorial (imprenta). node gen_pdf.mjs
import fs from 'node:fs';
const PW = 595.28, PH = 841.89;
let s = '';
const col = (r, g, b) => `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} rg `;
const colS = (r, g, b) => `${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} RG `;
const fr = (x, y, w, h, c) => { s += col(...c) + `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re f\n`; };
const sr = (x, y, w, h, c, lw = 2) => { s += colS(...c) + `${lw} w ` + `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re S\n`; };
const esc = t => t.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
function txt(t, x, y, size, font, c, center = false) {
  s += `BT ${col(...c)}/${font} ${size} Tf `;
  if (center) { const w = t.length * size * 0.58; s += `1 0 0 1 ${(x - w / 2).toFixed(1)} ${y.toFixed(1)} Tm (${esc(t)}) Tj ET\n`; }
  else s += `1 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)} Tm (${esc(t)}) Tj ET\n`;
}
const GREEN = [11, 61, 46], GOLD = [240, 199, 94], WHITE = [255, 255, 255], DARK = [16, 40, 31], CREAM = [245, 241, 228], RED = [226, 59, 59], CYAN = [56, 225, 255], SKIN = [242, 201, 164], BLACK = [10, 10, 10];
// fondo + textura de puntos
fr(0, 0, PW, PH, GREEN);
for (let y = 8; y < PH; y += 14) for (let x = 8; x < PW; x += 14) fr(x, y, 2, 2, [18, 74, 58]);
// bordes + esquinas
sr(8, 8, PW - 16, PH - 16, GOLD, 5);
for (const [cx, cy] of [[26, PH - 100], [PW - 100, PH - 100], [26, 26], [PW - 100, 26]]) { fr(cx, cy, 74, 74, [6, 37, 28]); sr(cx, cy, 74, 74, WHITE, 6); }
// logos
fr(48, PH - 140, 64, 64, WHITE); sr(48, PH - 140, 64, 64, GOLD, 3);
txt('IA', 80, PH - 112, 20, 'F1', DARK, true); txt('DIA', 80, PH - 132, 13, 'F1', DARK, true);
fr(PW - 112, PH - 140, 64, 64, WHITE); sr(PW - 112, PH - 140, 64, 64, GOLD, 3);
txt('RFA', PW - 80, PH - 112, 15, 'F1', DARK, true); txt('2026', PW - 80, PH - 130, 11, 'F1', DARK, true);
// titulos
txt('IA AL COLORADO - AUXILIAR EN IA 2026', PW / 2, PH - 92, 11, 'F1', GOLD, true);
txt('LAMINA DIA N. 42', PW / 2, PH - 128, 30, 'F1', WHITE, true);
txt('El Colorado, Formosa - Practicas Profesionalizantes', PW / 2, PH - 148, 9, 'F2', [207, 227, 214], true);
// tarjetas
function card(x, y, w, h, name, l1, l2, who) {
  fr(x, y, w, h, CREAM); sr(x, y, w, h, DARK, 4);
  const bx = x + (w - 140) / 2, by = y + h - 168;
  if (who === 'A') {
    fr(bx, by, 140, 140, RED);
    fr(bx + 20, by + 78, 42, 26, CYAN); fr(bx + 78, by + 78, 42, 26, CYAN);
    fr(bx + 6, by + 6, 12, 12, GOLD); fr(bx + 122, by + 6, 12, 12, GOLD); fr(bx + 6, by + 122, 12, 12, GOLD); fr(bx + 122, by + 122, 12, 12, GOLD);
    fr(bx + 35, by + 22, 70, 20, [42, 10, 10]); fr(bx + 41, by + 26, 58, 6, WHITE);
  } else {
    fr(bx, by, 140, 140, SKIN); fr(bx, by + 106, 140, 34, [42, 32, 24]);
    sr(bx + 18, by + 66, 44, 44, BLACK, 5); sr(bx + 78, by + 66, 44, 44, BLACK, 5);
    fr(bx + 62, by + 84, 16, 8, BLACK);
    fr(bx + 50, by + 40, 40, 12, [122, 42, 42]);
  }
  txt(name, x + w / 2, y + 64, 20, 'F1', DARK, true);
  txt(l1, x + w / 2, y + 44, 8, 'F1', DARK, true);
  txt(l2, x + w / 2, y + 30, 8, 'F1', DARK, true);
}
card(44, 400, 248, 232, 'AURA', 'ROBOT VOLADORA - HISTORIA', 'CHACO, FORMOSA, MISIONES', 'A');
card(303, 400, 248, 232, 'ROOT', 'NINO DOCTOR - IA Y TECNO', 'SENSORES, DRONES, DATOS', 'R');
// banda + guarda
fr(36, 352, 523, 38, GOLD); sr(36, 352, 523, 38, DARK, 3);
txt('ENFOCA CON LENTE DIA', PW / 2, 364, 16, 'F1', DARK, true);
const seg = [GOLD, DARK, CYAN, GOLD, RED, DARK, GOLD, CYAN];
seg.forEach((c, i) => fr(36 + i * 65.4, 318, 65.4, 24, c));
// pie
fr(36, 150, 523, 158, [4, 26, 20]); sr(36, 150, 523, 158, GOLD, 2);
const foot = ['Vuelan sobre Formosa: capital, El Colorado, Clorinda,', 'Pirane, Las Lomitas, Banado La Estrella.', 'Son recreaciones con IA (UNESCO 2021). La voz viaja', 'a ElevenLabs. Nada de deepfakes.', 'Imprimi en A4 color, papel mate. Abri la Lente DIA', 'en https, toca Abrir camara y enfoca esta lamina.'];
foot.forEach((l, i) => txt(l, PW / 2, 286 - i * 22, 10, 'F2', [232, 241, 230], true));
const stream = Buffer.from(s, 'latin1');
const objs = [];
objs[1] = '<< /Type /Catalog /Pages 2 0 R >>';
objs[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
objs[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`;
objs[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
objs[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
objs[6] = `<< /Length ${stream.length} >>\nstream\n` + s + 'endstream';
let out = '%PDF-1.4\n', offs = [];
for (let i = 1; i <= 6; i++) { offs[i] = Buffer.byteLength(out, 'latin1'); out += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
const xpos = Buffer.byteLength(out, 'latin1');
out += `xref\n0 7\n0000000000 65535 f \n` + offs.slice(1).map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('') + `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xpos}\n%%EOF`;
fs.writeFileSync('lamina.pdf', Buffer.from(out, 'latin1'));
console.log('lamina.pdf OK bytes=' + Buffer.byteLength(out, 'latin1'));
