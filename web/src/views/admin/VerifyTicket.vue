<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { api } from "@plugins/api";

export default defineComponent({
  name: "VerifyTicket",
  async setup() {
    const route = useRoute();
    const { success } = await api.events.verifyTicket(
      route.params.code as string,
    );

    return {
      status: success ? "Ticket is valid" : "Invalid ticket",
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-32
  h1.text-brand {{ status }}
</template>
