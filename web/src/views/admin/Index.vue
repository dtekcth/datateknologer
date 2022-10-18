<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";
import logoUrl from "../../assets/logo.webp";
import { api } from "../../plugins/api";
import { CONFIG } from "@plugins/http";

import { format } from "date-fns";

export default defineComponent({
  name: "Home",
  async setup() {
    const l = useLocalization();
    const { locale, tl } = storeToRefs(l);

    return {
      tl,
      logoUrl,
      locale,
      events: await api.events.list(),
      jobs: await api.jobs.open(),
      CONFIG,
      format,
    };
  },
});
</script>

<template lang="pug">
.w-screen.text-base-content
  .flex.justify-between.items-center.p-4.px-16
    Link.logo.drop-shadow(:to="{ name: 'Home' }")
      .h-32.w-64.bg-contain.bg-no-repeat(
        :style="{ backgroundImage: `url('${logoUrl}')` }"
      )

  section.bg-base-100.border-y-brand.border-t-8.grid.grid-cols-2.justify-center.gap-16.p-8.px-64
    div
      .flex.items-center.justify-between.mb-8
        h1.font-display.text-brand Events
        Link(:to="{ name: 'Admin/CreateEvent' }")
          .btn New event
      .flex.items-center(v-if="events.isEmpty()", class="h-[10rem]")
        div
          h2 There are currently no scheduled events
      .grid.flex-col.gap-16(v-else)
        div(v-for="event in events")
          .flex.justify-between
            div(class="w-[60ch]")
              .flex.items-center.justify-between.mb-2
                h3.font-display.text-brand.mb-0 {{ event.title }}
                .text-lg.text-muted.font-display.font-bold {{ format(event.date, "yyyy-MM-dd") }}
              .text-lg.mb-8.whitespace-pre-line {{ event.description }}
              .flex.items-center.justify-between
                Link(
                  :to="{ name: 'Admin/EditEvent', params: { id: event.id } }"
                )
                  .btn.w-32 Edit
                .text-lg Registration closes {{ format(event.registrationCloses, "yyyy-MM-dd") }}

    div
      .flex.items-center.justify-between.mb-8
        h1.font-display.text-brand Job listings
        Link(:to="{ name: 'Admin/CreateJobAd' }")
          .btn New ad
      .flex.items-center(v-if="jobs.isEmpty()", class="h-[10rem]")
        div
          h2 There are currently no available job listings
      .grid.flex-col.gap-16(v-else)
        div(v-for="ad in jobs")
          .flex.justify-between
            div(class="w-[60ch]")
              .flex.items-center.justify-between.mb-2
                h3.font-display.text-brand.mb-0 {{ ad.title }}
                //- .text-lg.text-muted.font-display.font-bold {{ format(ad.date, "yyyy-MM-dd") }}
              .text-lg.mb-8.whitespace-pre-line {{ ad.description }}
              .flex.items-center.justify-between
                Link(:to="{ name: 'Admin/EditJobAd', params: { id: ad.id } }")
                  .btn.w-32 Edit
                .text-lg Application closes {{ format(ad.closesOn, "yyyy-MM-dd") }}

  //- section.w-full.bg-base-100.p-16.px-64.no-parallax.border-t-brand.border-t-8
  //-   .flex.justify-center.flex-col.items-center.mb-8
  //-     h1.pb-2.mb-2.font-display.text-brand Profiles

  //-   .grid.gap-32.mb-8(
  //-     v-for="row in profiles",
  //-     :class="[`grid-cols-${row[1].length}`]"
  //-   )
  //-     .flex.flex-col.items-center(
  //-       v-for="{ id, email, name, pictureUrl, title } in row[1]"
  //-     )
  //-       .w-full.mb-4.relative
  //-         img.w-full.rounded-xl.shadow-xl.bg-no-repeat(:src="pictureUrl")
  //-         input.absolute.w-full.h-full.opacity-0(
  //-           ref="uploadInput",
  //-           type="file",
  //-           @change="updateImage(id, $event)"
  //-         )
  //-       .flex.flex-col.w-full.text-center
  //-         .text-xl.text-brand.font-bold.font-display {{ name }}
  //-         .text-lg.font-bold {{ title }}
  //-         .text-lg {{ email }}

  Footer
</template>

<style scoped lang="scss">
input[type="file"] {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
