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
  section.w-full.bg-no-repeat.flex.flex-col.relative.no-parallax.landing(
    class="lg:hidden h-[40vh]"
  )
    .absolute.w-full.h-72.scrim 
    Header
  section.hidden.h-screen.w-full.bg-cover.bg-no-repeat.flex.flex-col.relative.parallax.landing(
    class="lg:block"
  )
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
        .text-4xl.text-brand.mb-4.font-bold.font-display Our Services
        .text-lg Our mission is to give the students of the Computer Science and Engineering division a broad picture of the many possibilities in the field. We do so by assisting companies in marketing or organizing events. With a student network that grows by each year, and plenty of driven student associations, we can help your company connect with the future of computer engineering.

    .grid.grid-cols-1.gap-12.mb-16(class="lg:grid-cols-3")
      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Lunch seminars
          .fa.fa-chalkboard-user
        .text-justify Let our students get to know what you do at your company, what cool techniques you use or let them get inspired by the journey of one of your employees! For an hour, you get the full attention of a lecture hall filled with students. Lunch lectures are very popular among our students, and a free lunch is seldom turned down.

      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Pub events
          .fa.fa-martini-glass
        .text-justify A student favorite! An evening with food, beverages and gött häng. During a company pub, you have the opportunity to get to know our students and introduce them to your company in a more relaxed atmosphere. Pub quizzes, case solving, or any other fun activity - the pub event is the perfect time to show off your company spirit and flair.

      div
        .flex.items-center.justify-between.gap-8.text-3xl.text-brand.mb-2
          .font-bold.font-display Marketing
          .fa.fa-bullhorn
        .text-justify Searching for a new developer? Hosting an epic hackathon or event? Something else entirely? We can help you spread the word! By utilizing one of our many marketing solutions, your company can reach our students through our social media channels, the division’s weekly newsletter, or with posters in all of our section premises.
    .flex.justify-center.pb-4
      .text-xl
        span Contact us at&nbsp;
        a.text-brand.font-bold(href="mailto:dag@dtek.se") dag@dtek.se
        span &nbsp;for more information.

  section.h-96.w-full.relative.parallax.intermission
    .absolute.center.bg-contain.bg-no-repeat.logo(
      class="w-[12rem] h-[6rem] md:w-[24rem] md:h-[12rem]",
      :style="{ backgroundImage: `url('${logoWhite}')` }"
    )

  section.w-full.bg-base-100.p-8.no-parallax.flex.flex-col.gap-12.border-y-brand.border-y-8(
    class="lg:px-16 2xl:px-64"
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
        .text-lg(class="2xl:w-[60ch] lg:order-last") We are one of the largest student divisions at Chalmers, and while we are not the largest, we do have the highest engagement rate with over 100 new volunteers every year. The Swedish trend of diminishing involvement can not be seen at our division, in contrast to other universities we are growing steadily by creating new forms of engagement.

        .flex.gap-8.justify-center.items-center(class="lg:justify-start")
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="22")
            .text-lg Committees &amp; Societies
          .text-center
            .text-3xl.font-display.font-bold.text-brand
              h1: AnimatedNumber(:target="102")
            .text-lg New volunteers every year

  section.h-96.w-full.relative.no-parallax.pub
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
    .grid.grid-cols-1.gap-4(class="lg:grid-cols-3 lg:gap-32")
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

.parallax.landing::after {
  background: url("../assets/theone.jpg");
  background-size: cover;
  transform: translateZ(-1px) scale(1.5);
}

.landing:not(.parallax) {
  background: url("../assets/theone.jpg");
  background-size: cover;
  background-position: center top;
}

@media screen {
}

.parallax.intermission::after {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/front.png");
  background-size: cover;
  height: 200%;

  transform: translateZ(-1px) scale(1.5);
}

.pub {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/pub.png");
  background-size: cover;
  // height: 100%;

  // transform: translateZ(-1px) scale(1.5);
}
</style>
