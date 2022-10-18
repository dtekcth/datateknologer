<script lang="ts">
import { useToastStore } from "@plugins/toaster";
import { defineComponent, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@plugins/api";
import { format, parseISO } from "date-fns";

export default defineComponent({
  name: "EditEvent",
  async setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToastStore();
    const imageFile: Ref<File | undefined> = ref(undefined);

    const ev = await api.events.get(Number(route.params.id));

    const innerModel = {
      title: ev.title,
      description: ev.description,
      date: format(ev.date, "yyyy-MM-dd"),
      time: format(ev.date, "hh:mm"),
      registrationCloses: format(ev.registrationCloses, "yyyy-MM-dd"),
      registrationOpens: format(ev.registrationOpens, "yyyy-MM-dd"),
      maxParticipants: String(ev.maxParticipants),
      foodWillBeServed: ev.foodWillBeServed,
      mailTemplate: ev.mailTemplate,
    };
    const model = ref(innerModel);

    const validators = {
      required: (m: string) => (m == "" ? "This field is required" : undefined),
      isDate: (m: string) =>
        /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(m)
          ? undefined
          : "Invalid format, use yyyy-mm-dd",
      isTime: (m: string) =>
        /[0-9]{2}:[0-9]{2}/.test(m) ? undefined : "Invalid format, use hh:mm",
      isNumber: (m: string) =>
        isNaN(Number(m)) ? "Must be a number" : undefined,
      isInt: (m: string) => {
        const res = validators.isNumber(m);
        if (res) return res;
        return /\./.test(m) ? "Must be an integer" : undefined;
      },
    };

    const validationModels: Ref<
      Record<keyof typeof innerModel, Array<(m: string) => string | undefined>>
    > = ref({
      title: [validators.required],
      description: [validators.required],
      date: [validators.required, validators.isDate],
      time: [validators.required, validators.isTime],
      registrationCloses: [validators.required, validators.isDate],
      registrationOpens: [validators.required, validators.isDate],
      maxParticipants: [validators.required, validators.isInt],
      foodWillBeServed: [],
      mailTemplate: [],
    });

    const errors: Ref<Record<keyof typeof innerModel, string | undefined>> =
      ref({
        title: undefined,
        description: undefined,
        date: undefined,
        time: undefined,
        registrationCloses: undefined,
        registrationOpens: undefined,
        maxParticipants: undefined,
        foodWillBeServed: undefined,
        mailTemplate: undefined,
      });

    const tryCreateEvent = async () => {
      let hasError = false;
      for (const key in model.value) {
        const k = key as keyof typeof innerModel;
        const v = model.value[k];
        errors.value[k] = undefined;
        for (const validator of validationModels.value[k]) {
          const res = validator(v as any);
          if (res) {
            errors.value[k] = res;
            hasError = true;
          }
        }
      }
      if (hasError) return;
      const res = await api.events.update({
        id: Number(route.params.id),
        title: model.value.title,
        description: model.value.description,
        date: parseISO(`${model.value.date}T${model.value.time}`),
        maxParticipants: Number(model.value.maxParticipants),
        registrationOpens: parseISO(model.value.registrationOpens),
        registrationCloses: parseISO(model.value.registrationCloses),
        foodWillBeServed: model.value.foodWillBeServed,
        mailTemplate: model.value.mailTemplate,
      });

      if (imageFile.value) {
        await api.events.uploadImage(Number(route.params.id), imageFile.value);
      }

      toast.push({
        content: "Updated event",
        color: "hsla(160, 22%, 46%)",
      });
      router.push({ name: "Admin" });
    };

    const archive = () => {
      toast.push({
        content: "Event has been archived",
        color: "hsla(160, 22%, 46%)",
      });

      api.events.update({
        id: Number(route.params.id),
        archived: true,
      });
      router.push({ name: "Admin" });
    };

    return {
      model,
      errors,
      tryCreateEvent,
      imageFile,
      ev,
      archive,
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-8
  .flex.flex-col.gap-8(class="w-1/2")
    .flex.flex-col.h-full
      h2.mb-4.text-brand Edit event
      div
        .text-lg.font-bold Title
          span.text-brand *
        RetroInput(v-model="model.title")
        .text-brand.h-6 {{ errors.title }}
      div
        .text-lg.font-bold Description
          span.text-brand *
        RetroTextbox(v-model="model.description")
        .text-brand.h-6 {{ errors.description }}
      .flex.gap-4
        .h-full
          .text-lg.font-bold Image
            span.text-brand *
          UploadField.h-full(icon="camera", class="w-[400px]", v-model="imageFile")
        .flex-grow.flex.flex-col.h-full.justify-between
          .flex.gap-4
            div
              .text-lg.font-bold Event date
                span.text-brand *
              RetroInput(v-model="model.date", placeholder="yyyy-mm-dd")
              .text-brand.h-6 {{ errors.date }}
            div
              .text-lg.font-bold Event time
                span.text-brand *
              RetroInput(v-model="model.time", placeholder="hh:mm")
              .text-brand.h-6 {{ errors.time }}
          div
            .text-lg.font-bold Registration opens
              span.text-brand *
            RetroInput(
              v-model="model.registrationOpens",
              placeholder="yyyy-mm-dd"
            )
            .text-brand.h-6 {{ errors.registrationOpens }}
          div
            .text-lg.font-bold Registration closes
              span.text-brand *
            RetroInput(
              v-model="model.registrationCloses",
              placeholder="yyyy-mm-dd"
            )
            .text-brand.h-6 {{ errors.registrationCloses }}
          div
            .text-lg.font-bold Maximum participants
              span.text-brand *
            RetroInput(v-model="model.maxParticipants")
            .text-brand.h-6 {{ errors.maxParticipants }}
          .flex.items-center.justify-between
            .text-lg.font-bold There will be food served
            RetroSwitch(v-model="model.foodWillBeServed")
      .pt-16
        .text-lg.font-bold Mail template
        RetroTextbox(v-model="model.mailTemplate")
        .text-brand.h-6 {{ errors.mailTemplate }}
      .flex.justify-end.pt-16.gap-8
        .btn(@click="archive") Archive
        .btn(@click="tryCreateEvent") Save

    .border-t-2.border-brand.mt-8
      .flex.justify-between.items-center
        h1.text-brand.my-4 Tickets
        .font-bold.text-lg {{ ev.maxParticipants - ev.tickets.length }} tickets left

      table.w-full
        thead
          tr
            th.p-2.text-left Name
            th.p-2.text-left Email
            th.p-2.text-left Food preferences
            th.p-2.text-center Checked-in
        tbody
          tr(v-for="ticket in ev.tickets")
            td.p-2 {{ ticket.name }}
            td.p-2 {{ ticket.email }}
            td.p-2 {{ ticket.foodPreferences }}
            td.p-2.text-2center
              .fa.fa-check.text-brand(v-if="ticket.attended")
              .fa.fa-xmark(v-else)
    .mb-32
</template>

<style scoped lang="scss">
th,
tr:nth-child(2n) {
  background-color: hsl(var(--b2));
}
</style>
