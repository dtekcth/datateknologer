<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { api } from "@plugins/api";
import QRCode from "qrcode";

export default defineComponent({
  name: "Ticket",
  async setup() {
    const route = useRoute();

    const url = `https://dag.dtek.se/en/admin/ticket/${
      route.params.code as string
    }`;
    const imgSrc = await QRCode.toDataURL(url);

    return {
      imgSrc,
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-32.p-8
  img(:src="imgSrc", :style="{ maxWidth: '300px', width: '100%' }")
</template>
