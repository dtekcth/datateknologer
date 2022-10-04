<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import logoUrl from "../assets/logo.webp";
import { api } from "../plugins/api";
import Footer from "../components/Footer.vue";
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
      events: await api.events.upcoming(),
      jobs: await api.jobs.open(),
      format,
      CONFIG,
    };
  },
  components: { Header, Footer },
});
</script>

<template lang="pug">
.w-screen.text-base-content.parallax-container
  section.h-72.w-full.bg-cover.bg-no-repeat.relative.parallax.landing
    Header

  section.bg-base-100.p-8.no-parallax.border-y-brand.border-y-8.flex(
    class="lg:justify-center"
  )
    div(class="lg:w-[110ch]")
      h1.font-display.text-brand.mb-8 Upcoming events
      .flex.items-center(v-if="events.isEmpty()", class="h-[10rem]")
        div
          h2 There are currently no scheduled events
          .text-lg Stay up to date by subscribing to the&nbsp;
            a.text-base-content.underline(
              href="https://dtek.se/newsletter",
              target="_blank"
            ) division newspaper.

      .flex.flex-col.gap-16(v-else)
        div(v-for="event in events")
          .flex.flex-col.justify-between.gap-8(class="lg:flex-row")
            img.object-contain(
              :src="`${CONFIG.PUBLIC_URL}/${event.imageUrl}`",
              class="lg:order-last max-h-[400px] max-w-[300px] lg:max-w-[460px]"
            )
            div(class="lg:w-[60ch]")
              .flex.flex-col.mb-4(
                class="lg:flex-row lg:items-center lg:justify-between"
              )
                h2.mb-0.font-display.text-brand {{ event.title }}
                .text-lg.text-muted.font-display.font-bold {{ format(event.date, "yyyy-MM-dd") }}
              .text-lg.mb-8 {{ event.description }}
              .flex.items-center.justify-between(
                v-if="event.maxParticipants > event.tickets"
              )
                Link(
                  :to="{ name: 'Register', query: { id: event.id, foodWillBeServed: event.foodWillBeServed } }"
                )
                  .btn Register
                .flex.text-right
                  span Registration closes on&nbsp;
                    span.font-bold {{ format(event.registrationCloses, "yyyy-MM-dd") }}
              .font-bold(v-else) There are no tickets left for this event.

  section.h-96.w-full.relative.parallax.pub
    .absolute.center.bg-contain.bg-no-repeat.logo(
      class="w-[12rem] h-[6rem] md:w-[24rem] md:h-[12rem]",
      :style="{ backgroundImage: `url('${logoUrl}')` }"
    )

  section.bg-base-100.p-8.no-parallax.border-t-brand.border-t-8(class="lg:px-64")
    .flex.justify-center
      h1.font-display.text-brand.mb-8 Job openings
    .flex.items-center(v-if="jobs.isEmpty()", class="h-[10rem]")
      div
        h2 There are currently no available job openings
        .text-lg Stay up to date by subscribing to the&nbsp;
          a.text-base-content.underline(
            href="https://dtek.se/newsletter",
            target="_blank"
          ) division newspaper.
    div(v-else)
      .grid.grid-cols-1.gap-16(class="lg:grid-cols-3")
        div(v-for="ad in jobs")
          .h-48.w-full.mb-4.bg-contain.bg-center.bg-no-repeat(
            :style="{ backgroundImage: `url('${CONFIG.PUBLIC_URL}/${ad.imageUrl}')` }"
          )
          h3.font-display.mb-2 {{ ad.title }}
          .text-lg.mb-4 {{ ad.description }}
          a.block.w-full(:href="ad.url"): .btn.w-full Apply

  .no-parallax
    Footer
</template>

<style lang="scss" scoped>
.parallax-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 2px;
}

section {
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
}

.no-parallax {
  position: relative;
  z-index: 999;
}

.parallax::after {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-position: center;
  z-index: -1;
}

.landing::after {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/dateit.jpg");
  background-size: cover;
  top: -10rem;
  height: 200%;

  transform: translateZ(-1px) scale(1.5);
}

.parallax.pub::after {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/basen.jpg");
  background-size: cover;
  height: 160%;

  transform: translateZ(-1px) scale(1.5);
}
</style>
