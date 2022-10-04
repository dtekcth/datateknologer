<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { computed } from "@vue/reactivity";
import { onClickOutside } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import logoUrl from "../assets/logo.webp";

export default defineComponent({
  name: "Header",
  setup() {
    const route = useRoute();
    const l = useLocalization();
    const { locale } = storeToRefs(l);
    const sidebarActive = ref(false);

    return {
      locale,
      l,
      logoUrl,
      enUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/en/")),
      svUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/sv/")),
      sidebarActive,
    };
  },
});
</script>

<template lang="pug">
div
  .flex.justify-between.items-center.p-4(class="lg:px-16")
    Link.logo.drop-shadow(:to="{ name: 'Home' }")
      .h-16.w-32.bg-contain.bg-no-repeat(
        :style="{ backgroundImage: `url('${logoUrl}')` }",
        class="lg:h-32 lg:w-64"
      )
    .text-white.text-4xl.z-50.fa.fa-bars(
      class="lg:hidden",
      @click="sidebarActive = !sidebarActive"
    )
    .hidden.flex.gap-4.items-center.text-2xl.text-white.font-black(class="lg:flex")
      Link.font-display.drop-shadow-xl.text-white(
        :to="{ name: 'Home', hash: '#services' }"
      ) Companies
      Link.font-display.drop-shadow.text-white(:to="{ name: 'Student' }") Students
      a.font-display.drop-shadow-xl.text-white(href="https://date-it.se") DatE-IT
  .sidebar.fixed.h-screen.bg-brand.left-0.top-0.p-4(
    :class="{ open: sidebarActive }"
  )(
    class="w-[30ch] lg:hidden"
  )
    .flex.flex-col.gap-8.text-2xl.text-white.font-black(class="lg:text-2xl")
      Link.font-display.drop-shadow-xl.text-white(
        :to="{ name: 'Home', hash: '#services' }"
      ) Companies
      Link.font-display.drop-shadow.text-white(:to="{ name: 'Student' }") Students
      a.font-display.drop-shadow-xl.text-white(href="https://date-it.se") DatE-IT
</template>

<style lang="scss" scoped>
.sidebar {
  transition: 0.3s ease;
  transform: translateX(-100%);
  &.open {
    transform: translateX(0%);
  }
}
</style>
