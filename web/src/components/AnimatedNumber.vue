<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Tween, update, Easing } from "@tweenjs/tween.js";

export default defineComponent({
  name: "AnimatedNumber",
  props: {
    start: {
      required: false,
      default: 0,
    },
    target: {
      required: true,
      type: Number,
    },
    duration: {
      required: false,
      default: 2000,
    },
  },
  setup(props) {
    const currentValue = ref(props.target);
    const elRef = ref(undefined);

    // let frameHandler: number;

    // // Handles updating the tween on each frame.
    // const animate = function (currentTime: any) {
    //   update(currentTime);
    //   frameHandler = requestAnimationFrame(animate);
    // };

    // const tweenValue = { current: props.start };
    // const tween = new Tween(tweenValue) // Create a new tween that modifies 'coords'.
    //   .to({ current: props.target }, props.duration) // Move to (300, 200) in 1 second.
    //   .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    //   .onUpdate(() => {
    //     currentValue.value = tweenValue.current.toFixed(0);
    //   })
    //   .onComplete(() => {
    //     cancelAnimationFrame(frameHandler);
    //   });
    // let options = {
    //   root: null,
    //   // rootMargin: "0px",
    //   threshold: 1.0,
    // };

    // let observer = new IntersectionObserver(() => {
    //   requestAnimationFrame(animate);
    //   tween.start();
    // }, options);

    // onMounted(() => {
    //   observer.observe(elRef.value as any);
    // });

    return {
      currentValue,
      elRef,
    };
  },
});
</script>

<template lang="pug">
span(ref="elRef") {{ currentValue }}
</template>
