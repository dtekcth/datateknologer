import { ref } from "vue";

export type IntroPhase = "hold" | "morph" | "enter" | "done";

/**
 * First-load sequence:
 *  hold  — loader shows logo + committee name, app not mounted yet
 *  morph — app mounts (entrance paused), loader logo flies to the nav
 *  enter — hero entrance plays underneath the overlaid logo
 *  done  — overlay removed
 */
export const introPhase = ref<IntroPhase>("hold");
