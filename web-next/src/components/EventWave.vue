<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

/* dithered overlapping waves rendered on a canvas — a calm placeholder
   shown when there are no upcoming events. ported from a standalone demo;
   the play/speed/blend controls were dropped in favour of a fixed loop. */

const canvas = ref<HTMLCanvasElement | null>(null);
let raf = 0;

const W = 1180;
const H = 480;
const MID = H / 2;

type Layer = {
  c: string;
  a: number;
  pitch: number;
  dash: number;
  gap: number;
  amp: number;
  spd: number;
  f: [number, number, number, number];
  ph: number;
};

const LAYERS: Layer[] = [
  { c: "#f2b78e", a: 0.6, pitch: 7, dash: 5, gap: 3.2, amp: 0.72, spd: 0.55, f: [1.3, 2.4, 4.2, 0.9], ph: 0.0 },
  { c: "#e2701f", a: 0.62, pitch: 6, dash: 4, gap: 2.6, amp: 0.9, spd: 1.0, f: [3.0, 5.0, 9.0, 1.5], ph: 1.6 },
  { c: "#9c360b", a: 0.72, pitch: 5, dash: 3.4, gap: 2.2, amp: 0.62, spd: 1.75, f: [5.5, 8.0, 13.0, 2.2], ph: 3.1 },
];

const envelope = (u: number) => Math.pow(Math.sin(Math.PI * u), 0.8);

const amp = (u: number, tt: number, L: Layer) => {
  const x = u * Math.PI * 2 + L.ph;
  const w1 = Math.sin(x * L.f[0] - tt * 1.7 * L.spd);
  const w2 = Math.sin(x * L.f[1] + tt * 1.1 * L.spd) * 0.55;
  const w3 = Math.sin(x * L.f[2] - tt * 2.6 * L.spd) * 0.3;
  const w4 = Math.sin(x * L.f[3] + tt * 0.6 * L.spd) * 0.8;
  const a = Math.abs(w1 + w2 + w3 + 0.6 * w4) * 0.5 + 0.26;
  return envelope(u) * a * L.amp;
};

const drawLayer = (ctx: CanvasRenderingContext2D, L: Layer, t: number) => {
  const N = Math.floor(W / L.pitch);
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const x = i * L.pitch + L.pitch / 2;
    const A = amp(u, t, L) * (MID * 0.94);
    for (let y = 0; y <= A; y += L.dash + L.gap) {
      const f = 1 - y / (MID * 0.94);
      const op = Math.max(0.1, Math.min(1, 0.22 + f * 0.92)) * L.a;
      const w = 1.4 + f * 1.5;
      const h = Math.min(L.dash, A - y);
      if (h <= 0) break;
      ctx.globalAlpha = op;
      ctx.fillStyle = L.c;
      ctx.fillRect(x - w / 2, MID - y - h, w, h);
      ctx.fillRect(x - w / 2, MID + y, w, h);
    }
  }
};

const frame = (ctx: CanvasRenderingContext2D, t: number) => {
  ctx.clearRect(0, 0, W, H);
  ctx.globalCompositeOperation = "multiply";
  for (const L of LAYERS) drawLayer(ctx, L, t);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
};

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    frame(ctx, 1.4);
    return;
  }

  let last = performance.now();
  let t = 0;
  const loop = (now: number) => {
    const dt = (now - last) / 1000;
    last = now;
    t += dt;
    frame(ctx, t);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
  <canvas
    ref="canvas"
    class="wave"
    :width="W"
    :height="H"
    aria-hidden="true"
  />
</template>

<style scoped>
.wave {
  position: relative; /* stays above the section's background art */
  z-index: 1;
  display: block;
  width: min(100%, 680px);
  height: auto;
  margin: 28px auto 0;
  pointer-events: none;
  user-select: none;
}
</style>
