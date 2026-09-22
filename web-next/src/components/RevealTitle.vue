<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* masked headline reveal: each word waits below its own clip window
   and slides up into place with a small left-to-right stagger — the
   same rise-in language the hero and menu use. scrolling back out
   lowers the words again (right-to-left), and it replays on re-entry.
   pure css transitions; the mask itself hides the text pre-trigger,
   so nothing needs measuring or arming. */

const props = defineProps<{ text: string }>();

const root = ref<HTMLElement | null>(null);
const shown = ref(false);

const words = computed(() => props.text.split(" "));

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !root.value) {
    shown.value = true;
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      shown.value = entries[entries.length - 1].isIntersecting;
    },
    { threshold: 0.5 },
  );
  observer.observe(root.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <h2
    ref="root"
    class="reveal"
    :class="{ shown }"
    :style="{ '--n': words.length }"
    :aria-label="text"
  >
    <span class="line" aria-hidden="true">
      <template v-for="(word, wi) in words" :key="`${wi}-${word}`">
        {{ wi > 0 ? " " : "" }}<span class="mask"><span
            class="word"
            :style="{ '--i': wi }"
          >{{ word }}</span></span>
      </template>
    </span>
  </h2>
</template>

<style scoped>
/* the clip window; a little padding (cancelled by negative margins)
   keeps descenders and letter overhangs unclipped at rest */
.mask {
  display: inline-block;
  overflow: clip;
  vertical-align: bottom;
  padding: 0.1em 0.06em;
  margin: -0.1em -0.06em;
}

/* hidden state doubles as the reverse: words sink back behind the
   clip right-to-left, a touch quicker than they rose */
.word {
  display: inline-block;
  transform: translateY(118%);
  transition: transform 520ms var(--ease-out)
    calc((var(--n) - 1 - var(--i)) * 70ms);
  will-change: transform;
}

.reveal.shown .word {
  transform: translateY(0);
  transition: transform 760ms var(--ease-out-expo) calc(var(--i) * 95ms);
}

@media (prefers-reduced-motion: reduce) {
  .word {
    transition: none;
    transform: none;
  }
}
</style>
