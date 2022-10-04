<script lang="ts">
import { useLocalization } from "@plugins/localization";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import frontUrl from "../assets/theone.png";
import logoOrange from "../assets/orange.svg";
import logoWhite from "../assets/white.svg";
import { config } from "../config";
import AnimatedNumber from "../components/AnimatedNumber.vue";

export default defineComponent({
  name: "Home",
  async setup() {
    const l = useLocalization();
    const { locale, tl } = storeToRefs(l);
    return {
      tl,
      frontUrl,
      logoOrange,
      logoWhite,
      locale,
      profiles: config.profiles,
    };
  },
  components: { Header, AnimatedNumber },
});
</script>

<template lang="pug">
.w-screen.text-base-content.parallax-container
  section.h-screen.w-full.bg-cover.bg-no-repeat.flex.flex-col.relative.parallax.landing
    .absolute.w-full.h-72.scrim 
    Header

  section#services.w-full.black.p-8.no-parallax.border-y-brand.border-y-8.px-8(
    class="lg:px-64"
  )
    .grid.grid-cols-1.gap-20.mb-16(class="lg:grid-cols-2")
      .bg-contain.bg-no-repeat.hidden(
        class="lg:block w-[64rem] h-[12rem]",
        :style="{ backgroundImage: `url('${logoOrange}')` }"
      )
      .flex-grow
        .text-4xl.text-brand.mb-4.font-bold.font-display Services
        .text-lg We offer you a large selection of services for your buisness. We can provide standard solutions or customized the events, based on your goals and ambitions. With a student network of more than 500 people, and plenty of driven student associations, we can help you meet several of your PR and recruitment goals.

    .grid.grid-cols-1.gap-12.mb-16(class="lg:grid-cols-3")
      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Lunch lecture
          .fa.fa-chalkboard-user
        .text-justify Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.

      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Pub events
          .fa.fa-martini-glass
        .text-justify Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.

      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Marketing
          .fa.fa-bullhorn
        .text-justify Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.

  section.h-96.w-full.relative.parallax.intermission
    .absolute.center.bg-contain.bg-no-repeat.logo(
      class="w-[12rem] h-[6rem] md:w-[24rem] md:h-[12rem]",
      :style="{ backgroundImage: `url('${logoWhite}')` }"
    )

  section.w-full.bg-base-100.p-16.px-8.no-parallax.flex.flex-col.gap-12.border-y-brand.border-y-8(
    class="lg:px-64"
  )
    .mb-8
      h1.font-display.mb-4.text-brand The program
      .grid.grid-cols-1.gap-8.items-center(class="lg:grid-cols-2")
        .text-lg(class="lg:w-[60ch]") We are one of the fastest growing programs at Chalmers University of Technology, having doubled the amount of new students since 2019. Our students are able to move on to a diverse selection of Master programmes, ranging from computer hardware, to automation, to software management.
        .flex.gap-8.justify-end.items-center
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="170")
            .text-lg New students every year
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="11")
            .text-lg Master programs
          .text-center
            h1: .text-brand 802
            .text-lg Total students

    .mb-8
      .flex(class="lg:justify-end")
        h1.font-display.mb-4.text-brand Our division
      .grid.grid-cols-1.gap-8.items-center(class="lg:grid-cols-2")
        .text-lg(class="lg:w-[60ch] lg:order-last") We are one of the largest student divisions at Chalmers, and while we are not the largest, we do have the highest engagement rate with over 100 new volunteers every year. The Swedish trend of diminishing involvement can not be seen at our division, in contrast to other universities we are growing steadily by creating new forms of engagement.

        .flex.gap-8.justify-center.items-center(class="lg:justify-start")
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="22")
            .text-lg Committees &amp; Societies
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="102")
            .text-lg New volunteers every year

  section.h-96.w-full.relative.parallax.pub
    .absolute.center.bg-contain.bg-no-repeat.logo(
      class="w-[12rem] h-[6rem] md:w-[24rem] md:h-[12rem]",
      :style="{ backgroundImage: `url('${logoWhite}')` }"
    )

  section.w-full.bg-base-100.no-parallax.border-t-brand.border-t-8.p-8(
    class="lg:p-16 lg:px-64"
  )
    .flex.justify-center.flex-col.items-center.mb-8
      h1.pb-2.mb-2.font-display.border-b.border-base-content.text-brand Our team
      .text-lg Don't hesitate to contact us if you have any questions
    .grid.grid-cols-1.gap-8.mb-4(class="lg:grid-cols-3 lg:gap-32")
      .flex.flex-col.items-center.mb-8(
        v-for="{email, name, pictureUrl, title} in profiles.take(3)"
      )
        img.w-full.rounded-xl.shadow-xl.bg-no-repeat.mb-4(:src="pictureUrl")
        .flex.flex-col.w-full.text-center
          .text-2xl.text-brand.font-bold.font-display {{ name }}
          .text-lg.font-bold {{ title }}
          .text-lg {{ email }}
    .grid.grid-cols-1.gap-4(class="lg:grid-cols-4 lg:gap-32")
      .flex.flex-col.items-center(
        v-for="{email, name, pictureUrl, title} in profiles.skip(3)"
      )
        img.w-full.rounded-xl.shadow-xl.bg-no-repeat.mb-4(:src="pictureUrl")
        .flex.flex-col.w-full.text-center
          .text-xl.text-brand.font-bold.font-display {{ name }}
          .text-lg.font-bold {{ title }}
          .text-lg {{ email }}
  Footer.no-parallax
</template>

<style lang="scss" scoped>
.abberate {
  --intensity: 0.01;
  --color-1: red;
  --color-2: blue;
  --scale: 1.15;
  --intensity: 1 + ((val - 50) / 1000);
  --deg-intensity: 1 + ((val - 50) / 50);

  color: hsl(203 23 15);
  color: hsl(203 23 18);
  color: hsl(203 23 22);

  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("../assets/theone.png");
    background-size: cover;
    mix-blend-mode: hard-light;
    filter: blur(calc(2px * var(--deg-intensity)));
    opacity: max(0.25, calc(0.5 * var(--deg-intensity, 1)));
    mask-image: radial-gradient(
      70% 70% at center,
      rgba(black, 0.333) 33.3%,
      black 90%
    );
    transform: rotate(calc(var(--base-deg) * var(--deg-intensity, 1)))
      scale3d(
        max(1, calc(var(--scale) * var(--intensity))),
        max(1, calc(var(--scale) * var(--intensity))),
        1
      );
    z-index: 1;
  }

  &:before {
    --base-deg: 3deg;
    background-color: var(--color-1);
    background-blend-mode: screen;
  }

  &:after {
    --base-deg: -3deg;
    background-color: var(--color-2);
    background-blend-mode: screen;
  }
}

.flip {
  transform: rotateY(180deg);
}

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
  z-index: 999;
}
.parallax::after {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-position: center center;
  z-index: -1;
}

.parallax.landing::after {
  background: url("../assets/theone.jpg");
  background-size: cover;
  transform: translateZ(-1px) scale(1.5);
}
.parallax.intermission::after {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/front.png");
  background-size: cover;
  height: 200%;

  transform: translateZ(-1px) scale(1.5);
}

.parallax.pub::after {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/pub.png");
  background-size: cover;
  height: 200%;

  transform: translateZ(-1px) scale(1.5);
}
</style>
