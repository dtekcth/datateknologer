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

    return {
      locale,
      l,
      logoUrl,
      enUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/en/")),
      svUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/sv/")),
    };
  },
});
</script>

<template lang="pug">
.flex.justify-between.items-center.p-4.px-16
  Link.logo.drop-shadow(:to="{ name: 'Home' }")
    .h-32.w-64.bg-contain.bg-no-repeat(
      :style="{ backgroundImage: `url('${logoUrl}')` }"
    )
  .flex.gap-4.items-center.text-2xl.text-white.font-black
    Link.font-display.drop-shadow-xl.text-white(
      :to="{ name: 'Home', hash: '#services' }"
    ) Companies
    Link.font-display.drop-shadow.text-white(:to="{ name: 'Student' }") Students
    a.font-display.drop-shadow-xl.text-white(href="https://date-it.se") DatE-IT
</template>
