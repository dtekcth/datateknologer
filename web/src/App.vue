<template lang="pug">
.app(theme="light")
  .flex.flex-col.min-h-screen
    View
    //- Footer
  Toaster
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { usePlausible } from "./plugins/plausible";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "./styles.scss";

a,
.link {
  cursor: pointer;
  // color: var(--sp-text);
  text-decoration: none;

  &:hover {
    // color: var(--sp-text);
  }
}

// .tenta-table {
//   font-weight: 400;
//   color: rgba(0, 0, 0, 0.85);
//   width: 100%;

//   a {
//     color: inherit;
//   }

//   .row.header {
//     font-weight: 700;
//     padding-bottom: 4px;
//     margin-bottom: 8px;
//     border-bottom: 2px solid #ddd;
//   }

//   .row:not(.header) {
//     padding-top: 6px;
//     padding-bottom: 6px;
//     border-bottom: 1px solid #ddd;

//     &:hover {
//       background-color: var(--sp-overlay);
//     }
//   }
// }

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;

  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
