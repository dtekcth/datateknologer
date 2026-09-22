<script setup lang="ts">
import { computed } from "vue";
import type { ApiEvent } from "@/api/events";
import { useLocale } from "@/composables/useLocale";

/* compact scrollable archive of every past event, opened from the
   "view all" button under the past grid. rows open the regular event
   detail dialog on top (the parent keeps this one mounted underneath,
   so closing the detail lands back in the list). escape handling
   lives in the parent, which knows which overlay is innermost. */

defineProps<{ events: ApiEvent[] }>();
const emit = defineEmits<{ close: []; select: [ApiEvent] }>();

const { lang } = useLocale();

const when = (iso: string) =>
  new Intl.DateTimeFormat(lang.value === "sv" ? "sv-SE" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));

const copy = computed(() =>
  lang.value === "sv"
    ? { title: "Alla tidigare event", close: "Stäng" }
    : { title: "All past events", close: "Close" },
);
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click.self="emit('close')">
      <div
        class="panel"
        role="dialog"
        aria-modal="true"
        :aria-label="copy.title"
      >
        <header class="head">
          <h3 class="head-title">
            {{ copy.title }}
            <span class="head-count">{{ events.length }}</span>
          </h3>
          <button class="close" :aria-label="copy.close" @click="emit('close')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </header>

        <ul class="list">
          <li v-for="e in events" :key="e.id">
            <button class="row" @click="emit('select', e)">
              <span class="row-when">{{ when(e.date) }}</span>
              <span class="row-title">{{ e.title }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 6; /* the detail dialog mounts later, so it paints on top */
  background: color-mix(in srgb, var(--ink) 40%, transparent);
  display: grid;
  place-items: center;
  padding: 24px;
  animation: backdrop-in 200ms var(--ease-out) both;
}

.panel {
  display: flex;
  flex-direction: column;
  width: min(480px, 100%);
  max-height: min(76vh, 640px);
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 var(--muted);
  color: var(--ink);
  font-family: var(--font-mono);
  animation: panel-in 260ms var(--ease-out-expo) both;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 2px solid var(--ink);
}

.head-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.head-count {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  margin-left: 6px;
}

.close {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink);
}

.close:hover {
  color: var(--orange);
}

.list {
  margin: 0;
  padding: 6px 20px 14px;
  list-style: none;
  overflow-y: auto;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  padding: 13px 2px;
  background: none;
  border: none;
  border-bottom: 1px solid color-mix(in srgb, var(--muted) 30%, var(--paper));
  cursor: pointer;
  text-align: left;
  font-family: var(--font-mono);
}

li:last-child .row {
  border-bottom: none;
}

.row-when {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.row-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink);
  transition: color 140ms var(--ease-out);
}

.row:hover .row-title {
  color: var(--orange);
}

.row:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: -2px;
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .panel {
    animation: none;
  }
}

@media (max-width: 640px) {
  .backdrop {
    padding: 14px;
  }

  .panel {
    max-height: 84vh;
  }
}
</style>
