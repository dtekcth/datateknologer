<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useLocalization } from "../plugins/localization";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import logoUrl from "../assets/logo.webp";

export default defineComponent({
  name: "Footer",
  setup() {
    const route = useRoute();
    const l = useLocalization();
    const { locale, tl } = storeToRefs(l);

    return {
      l,
      tl,
      locale,
      enUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/en/")),
      svUrl: computed(() => route.fullPath.replace(/\/(en|sv)\/?/, "/sv/")),
      logoUrl,
    };
  },
});
</script>

<template lang="pug">
.flex.flex-col.bg-base-200.gap-4.pb-12.border-t-8.border-brand.p-4(class="lg:px-64")
  .grid.grid-cols-1.gap-8(class="lg:grid-cols-2")
    .flex.flex-col.items-center
      .drop-shadow
        .h-32.w-64.bg-contain.bg-no-repeat(
          :style="{ backgroundImage: `url('${logoUrl}')` }"
        )
      table.h-32
        tbody.text-lg
          tr.h-8
            td.font-bold.text-brand.text-right.pr-4 Email
            td.text-left dag@dtek.se
          tr.h-8
            td.font-bold.text-brand.text-right.pr-4 Address
            td.text-left Datateknologsektionen Chalmers Studentkår
          tr.h-8
            td
            td.text-left Rännvägen 8
          tr.h-8
            td
            td.text-left 412 58 Göteborg
          tr.h-8
            td.font-bold.text-brand.text-right.pr-4.w-32 Org. no.
            td.text-left 857209-7080
      .flex-grow
    div(class="lg:order-first")
      .gmap
        iframe#gmap_canvas(
          width="500",
          height="400",
          src="https://maps.google.com/maps?q=r%C3%A4nnv%C3%A4gen%208&t=&z=15&ie=UTF8&iwloc=&output=embed",
          frameborder="0",
          scrolling="no",
          marginheight="0",
          marginwidth="0"
        )
  .flex.flex-col.justify-between.items-center.gap-8(class="lg:flex-row lg:gap-32")
    div
      .text-brand © 2022 Datateknologsektionen, Chalmers studentkår
      div Designed by&nbsp;
        a.font-bold.text-base-content(href="https://github.com/toasterbag") David Hedgren
    .flex.items-center.gap-8.mb-4
      a(href="https://www.facebook.com/DAG.Chalmers"): .fa-brands.fa-facebook.text-4xl
      a(href="https://www.linkedin.com/company/dag-chalmers/about/"): .fa-brands.fa-linkedin.text-4xl
</template>

<style scoped lang="scss">
.gmap {
  overflow: hidden;
  background: none !important;
}
</style>
