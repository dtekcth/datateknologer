<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { api } from "@plugins/api";

export default defineComponent({
  name: "VerifyTicket",
  async setup() {
    const route = useRoute();
    const res = await api.events.verifyTicket(route.params.code as string);

    if ("success" in res) {
      return {
        status: res?.success ? "Ticket is valid" : "Invalid ticket",
        event: res.event,
        attendee: res.attendee,
      };
    }

    return {
      status: "You need to be signed in to verify tickets",
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-32
  h1.text-brand {{ status }}
  div(v-if="event")
    span.font-bold Event:&nbsp;
    span {{ event }}
  div(v-if="attendee")
    span.font-bold Event:&nbsp;
    span {{ attendee }}
</template>
