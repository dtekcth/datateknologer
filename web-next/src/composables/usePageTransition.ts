import { ref } from "vue";

export type TransitionPhase = "idle" | "cover" | "reveal";
export type TransitionMode = "dolly" | "fade";

/** Drives the App.vue camera dolly + TransitionVeil whiteout; written by router guards. */
export const phase = ref<TransitionPhase>("idle");

/** "dolly" flies the camera forward — reserved for leaving the landing
 *  (pick student/company) page. Every other swap uses "fade", a plain
 *  paper crossfade with no zoom. */
export const mode = ref<TransitionMode>("dolly");

/* must match the animation durations in App.vue / TransitionVeil.vue */
const COVER_MS = { dolly: 760, fade: 300 } as const;
const HOLD_MS = 120;
const REVEAL_MS = { dolly: 620, fade: 360 } as const;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Cover the screen (dolly zoom or plain fade); resolves once hidden. */
export const coverScreen = (m: TransitionMode = "dolly") =>
  new Promise<void>((resolve) => {
    if (prefersReducedMotion()) {
      resolve();
      return;
    }
    mode.value = m;
    phase.value = "cover";
    setTimeout(resolve, COVER_MS[m]);
  });

/** Fade the veil off the incoming page (no-op if the screen was never covered). */
export const revealScreen = () => {
  if (phase.value !== "cover") return;
  setTimeout(() => {
    phase.value = "reveal";
    setTimeout(() => {
      phase.value = "idle";
    }, REVEAL_MS[mode.value]);
  }, HOLD_MS);
};
