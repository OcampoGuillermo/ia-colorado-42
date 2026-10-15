// Genera lamina.png 794x1123 (A4 @96dpi) sin dependencias. node gen_lamina.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';
const W = 794, H = 1123;
const buf = Buffer.alloc(W * H * 3);
// PRNG deterministico
let seed = 42; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const px = (x, y, r, g, b) => { if (x < 0 || y < 0 || x >= W || y >= H) return; const i = (y * W + x) * 3; buf[i] = r; buf[i+1] = g; buf[i+2] = b; };
const rect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) px(i, j, c[0], c[1], c[2]); };
const GREEN = [11, 61, 46], GOLD = [240, 199, 94], WHITE = [255, 255, 255], DARK = [16, 40, 31], CREAM = [245, 241, 228], RED = [226, 59, 59], CYAN = [56, 225, 255], SKIN = [242, 201, 164], BLACK = [10, 10, 10];
// fondo + textura fina para tracking
rect(0, 0, W, H, GREEN);
for (let y = 0; y < H; y += 4) for (let x = ((y / 4) % 2) * 4; x < W; x += 8) px(x, y, 14, 70, 54);
for (let i = 0; i < 9000; i++) { const x = (rnd() * W) | 0, y = (rnd() * H) | 0; px(x, y, 20, 80, 62); }
for (let k = -H; k < W; k += 18) for (let y = 0; y < H; y++) { const x = k + y; if (x >= 0 && x < W && ((x + y) % 36 < 2)) px(x, y, 18, 74, 58); }
// bordes
for (let i = 10; i < W - 10; i++) for (let t = 0; t < 6; t++) { px(i, 10 + t, ...GOLD); px(i, H - 11 - t, ...GOLD); }
for (let j = 10; j < H - 10; j++) for (let t = 0; t < 6; t++) { px(10 + t, j, ...GOLD); px(W - 11 - t, j, ...GOLD); }
// esquinas marcador
for (const [cx, cy] of [[34, 34], [W - 108, 34], [34, H - 108], [W - 108, H - 108]]) { rect(cx, cy, 74, 74, [6, 37, 28]); for (let i = 0; i < 74; i++) for (let t = 0; t < 8; t++) { px(cx + i, cy + t, ...WHITE); px(cx + i, cy + 66 + t, ...WHITE); px(cx + t, cy + i, ...WHITE); px(cx + 66 + t, cy + i, ...WHITE); } }
// fuente 5x7 propia
const F = {
A: ['01110','10001','10001','11111','10001','10001','10001'], B: ['11110','10001','10001','11110','10001','10001','11110'],
C: ['01110','10001','10000','10000','10000','10001','01110'], D: ['11110','10001','10001','10001','10001','10001','11110'],
E: ['11111','10000','10000','11110','10000','10000','11111'], F: ['11111','10000','10000','11110','10000','10000','10000'],
G: ['01110','10001','10000','10111','10001','10001','01111'], H: ['10001','10001','10001','11111','10001','10001','10001'],
I: ['01110','00100','00100','00100','00100','00100','01110'], J: ['00111','00010','00010','00010','00010','10010','01100'],
K: ['10001','10010','10100','11000','10100','10010','10001'], L: ['10000','10000','10000','10000','10000','10000','11111'],
M: ['10001','11011','10101','10101','10001','10001','10001'], N: ['10001','11001','10101','10011','10001','10001','10001'],
O: ['01110','10001','10001','10001','10001','10001','01110'], P: ['11110','10001','10001','11110','10000','10000','10000'],
Q: ['01110','10001','10001','10001','10101','10010','01101'], R: ['11110','10001','10001','11110','10100','10010','10001'],
S: ['01111','10000','10000','01110','00001','00001','11110'], T: ['11111','00100','00100','00100','00100','00100','00100'],
U: ['10001','10001','10001','10001','10001','10001','01110'], V: ['10001','10001','10001','10001','10001','01010','00100'],
W: ['10001','10001','10001','10101','10101','11011','10001'], X: ['10001','10001','01010','00100','01010','10001','10001'],
Y: ['10001','10001','01010','00100','00100','00100','00100'], Z: ['11111','00001','00010','00100','01000','10000','11111'],
'0': ['01110','10001','10011','10101','11001','10001','01110'], '1': ['00100','01100','00100','00100','00100','00100','01110'],
'2': ['01110','10001','00001','00110','01000','10000','11111'], '3': ['11111','00010','00100','00010','00001','10001','01110'],
'4': ['00010','00110','01010','10010','11111','00010','00010'], '5': ['11111','10000','11110','00001','00001','10001','01110'],
'6': ['00110','01000','10000','11110','10001','10001','01110'], '7': ['11111','00001','00010','00100','01000','01000','01000'],
'8': ['01110','10001','10001','01110','10001','10001','01110'], '9': ['01110','10001','10001','01111','00001','00010','01100'],
' ': ['00000','00000','00000','00000','00000','00000','00000'], '.': ['00000','00000','00000','00000','00000','00110','00110'],
',': ['00000','00000','00000','00000','00110','00100','01000'], ':': ['00000','00110','00110','00000','00110','00110','00000'],
'!': ['00100','00100','00100','00100','00100','00000','00100'], '-': ['00000','00000','00000','11111','00000','00000','00000'],
'+': ['00000','00100','00100','11111','00100','00100','00000'], '/': ['00001','00010','00010','00100','01000','01000','10000'],
'(': ['00010','00100','01000','01000','01000','00100','00010'], ')': ['01000','00100','00010','00010','00010','00100','01000'],
'*': ['00000','10101','01110','11111','01110','10101','00000'], '>': ['01000','00100','00010','00001','00010','00100','01000'],
};
function text(s, x, y, sc, c) { s = String(s).toUpperCase(); let cx = x; for (const ch of s) { const g = F[ch] || F[' ']; for (let r = 0; r < 7; r++) for (let col = 0; col < 5; col++) if (g[r][col] === '1') for (let a = 0; a < sc; a++) for (let b = 0; b < sc; b++) px(cx + col * sc + a, y + r * sc + b, c[0], c[1], c[2]); cx += 6 * sc; } return cx; }
function center(s, y, sc, c) { const w = String(s).length * 6 * sc; text(s, (W - w) / 2 | 0, y, sc, c); }
// logos + titulos
rect(60, 60, 86, 86, WHITE); rect(60, 60, 86, 8, GOLD); rect(60, 138, 86, 8, GOLD);
text('IA', 88, 72, 4, DARK); text('DIA', 76, 104, 3, DARK);
rect(W - 146, 60, 86, 86, WHITE); rect(W - 146, 60, 86, 8, GOLD); rect(W - 146, 138, 86, 8, GOLD);
text('RFA', 672, 84, 3, DARK); text('26', 688, 112, 3, DARK);
center('IA AL COLORADO - AUXILIAR EN IA 2026', 66, 2, GOLD);
center('LAMINA DIA N.42', 100, 6, WHITE);
center('EL COLORADO, FORMOSA - PRACTICAS PROFESIONALIZANTES', 152, 2, [207, 227, 214]);
// fila de rombos
for (let i = 0; i < 24; i++) { const x = 60 + i * 28, y = 190; for (let d = -8; d <= 8; d++) for (let e = -4; e <= 4; e++) if (Math.abs(d) + Math.abs(e) * 2 < 9) px(x + d, y + e, ...(i % 2 ? GOLD : CYAN)); }
// tarjetas
function card(x, y, w, h, name, l1, l2, who) {
  rect(x, y, w, h, CREAM);
  for (let i = 0; i < w; i += 2) for (let t = 0; t < 5; t++) { px(x + i, y + t, ...DARK); px(x + i, y + h - 1 - t, ...DARK); }
  for (let j = 0; j < h; j += 2) for (let t = 0; t < 5; t++) { px(x + t, y + j, ...DARK); px(x + w - 1 - t, y + j, ...DARK); }
  const bx = x + ((w - 190) / 2 | 0), by = y + 14;
  if (who === 'AURA') {
    rect(bx, by, 190, 190, RED);
    for (let d = 0; d < 190; d += 6) px(bx + d, by + d * 0, 200, 60, 60);
    rect(bx, by, 190, 190, [0,0,0].map(() => 0).length ? RED : RED); // base
    rect(bx + 8, by + 8, 174, 174, RED);
    rect(bx + 28, by + 62, 56, 36, CYAN); rect(bx + 106, by + 62, 56, 36, CYAN);
    rect(bx + 28, by + 62, 56, 6, WHITE); rect(bx + 106, by + 62, 56, 6, WHITE);
    for (const [ox, oy] of [[6, 6], [168, 6], [6, 168], [168, 168]]) rect(bx + ox, by + oy, 16, 16, GOLD);
    rect(bx + 47, by + 130, 96, 28, [42, 10, 10]); rect(bx + 55, by + 134, 80, 9, WHITE);
  } else {
    rect(bx, by, 190, 190, SKIN);
    rect(bx, by, 190, 44, [42, 32, 24]);
    for (let a = 0; a < 360; a += 6) { const r1 = 30, r2 = 30; const cx1 = bx + 55, cy1 = by + 88, cx2 = bx + 135, cy2 = by + 88;
      px(cx1 + Math.cos(a * Math.PI / 180) * r1 | 0, cy1 + Math.sin(a * Math.PI / 180) * r1 | 0, ...BLACK); px(cx2 + Math.cos(a * Math.PI / 180) * r2 | 0, cy2 + Math.sin(a * Math.PI / 180) * r2 | 0, ...BLACK); }
    rect(bx + 47, by + 78, 16, 40, SKIN); rect(bx + 127, by + 78, 16, 40, SKIN);
    for (let a = 0; a <= 180; a += 5) { const r = 30; px(bx + 95 + Math.cos((180 + a) * Math.PI / 180) * r | 0, by + 140 + Math.sin((180 + a) * Math.PI / 180) * r * 0.5 | 0, 122, 42, 42); px(bx + 95 + Math.cos((180 + a) * Math.PI / 180) * r | 0, by + 141 + Math.sin((180 + a) * Math.PI / 180) * r * 0.5 | 0, 122, 42, 42); }
    rect(bx + 85, by + 84, 20, 12, [232, 176, 138]);
  }
  const nw = name.length * 6 * 5; text(name, x + ((w - nw) / 2 | 0), y + 216, 5, DARK);
  const w1 = l1.length * 6 * 2; text(l1, x + ((w - w1) / 2 | 0), y + 258, 2, DARK);
  const w2 = l2.length * 6 * 2; text(l2, x + ((w - w2) / 2 | 0), y + 276, 2, DARK);
}
card(56, 224, 334, 310, 'AURA', 'ROBOT VOLADORA - HISTORIA', 'CHACO, FORMOSA, MISIONES', 'AURA');
card(404, 224, 334, 310, 'ROOT', 'NINO DOCTOR - IA Y TECNO', 'SENSORES, DRONES, DATOS', 'ROOT');
// banda
rect(46, 552, 702, 52, GOLD); rect(46, 552, 702, 5, DARK); rect(46, 599, 702, 5, DARK);
center('> ENFOCA CON LENTE DIA <', 564, 4, DARK);
// guarda 8 segmentos
const seg = [[240,199,94],[16,40,31],[56,225,255],[240,199,94],[226,59,59],[16,40,31],[240,199,94],[56,225,255]];
seg.forEach((c, i) => { rect(46 + i * 88, 616, 86, 30, c); for (let d = 0; d < 86; d += 8) for (let e = 0; e < 30; e += 8) px(46 + i * 88 + d, 616 + e, 0, 0, 0); });
// pie
rect(46, 660, 702, 300, [4, 26, 20]);
for (let i = 0; i < 702; i += 10) { px(46 + i, 660, ...GOLD); px(46 + i, 959, ...GOLD); }
const foot = ['VUELAN SOBRE FORMOSA: CAPITAL, EL COLORADO,', 'CLORINDA, PIRANE, LAS LOMITAS, BANADO LA ESTRELLA.', 'SON RECREACIONES CON IA (UNESCO 2021). LA VOZ', 'VIAJA A ELEVENLABS. NADA DE DEEPFAKES.', 'IMPRIMI EN A4 COLOR, PAPEL MATE. ABRI LA LENTE', 'DIA EN HTTPS, TOCA ABRIR CAMARA Y ENFOCA.'];
foot.forEach((l, i) => { const wpx = l.length * 6 * 2; text(l, 46 + ((702 - wpx) / 2 | 0), 690 + i * 40, 2, [232, 241, 230]); });
for (let i = 0; i < 24; i++) { const x = 60 + i * 28, y = 1000; for (let d = -8; d <= 8; d++) for (let e = -4; e <= 4; e++) if (Math.abs(d) + Math.abs(e) * 2 < 9) px(x + d, y + e, ...(i % 2 ? CYAN : GOLD)); }
// PNG encode
function crc(t, d) { const tab = crc.t || (crc.t = (() => { const tt = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; tt[n] = c; } return tt; })()); let c = 0xffffffff; const b = Buffer.concat([Buffer.from(t), d]); for (let i = 0; i < b.length; i++) c = tab[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(t, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const c = Buffer.alloc(4); c.writeUInt32BE(crc(t, d)); return Buffer.concat([l, Buffer.from(t), d, c]); }
const raw = Buffer.alloc((1 + W * 3) * H);
for (let y = 0; y < H; y++) { raw[y * (1 + W * 3)] = 0; buf.copy(raw, y * (1 + W * 3) + 1, y * W * 3, (y + 1) * W * 3); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
fs.writeFileSync('lamina.png', png);
console.log('lamina.png OK bytes=' + png.length);
