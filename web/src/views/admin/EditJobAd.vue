<script lang="ts">
import { useToastStore } from "@plugins/toaster";
import { defineComponent, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@plugins/api";
import { format, parseISO } from "date-fns";

export default defineComponent({
  name: "EditJobAd",
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToastStore();
    const imageFile: Ref<File | undefined> = ref(undefined);
    const ad = await api.jobs.get(Number(route.params.id));

    const innerModel = {
      title: ad.title,
      description: ad.description,
      closesOn: format(ad.closesOn, "yyyy-MM-dd"),
      url: ad.url,
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
      closesOn: [validators.required, validators.isDate],
      url: [validators.required],
    });

    const errors: Ref<Record<keyof typeof innerModel, string | undefined>> =
      ref({
        title: undefined,
        description: undefined,
        closesOn: undefined,
        url: undefined,
      });

    const tryCreateJobAd = async () => {
      let hasError = false;
      for (const key in model.value) {
        const k = key as keyof typeof innerModel;
        const v = model.value[k];
        errors.value[k] = undefined;
        for (const validator of validationModels.value[k]) {
          const res = validator(v);
          if (res) {
            errors.value[k] = res;
            hasError = true;
          }
        }
      }
      if (hasError) return;
      const res = await api.jobs.update({
        id: Number(route.params.id),
        title: model.value.title,
        description: model.value.description,
        closesOn: parseISO(model.value.closesOn),
        url: model.value.url,
      });

      if (imageFile.value) {
        await api.jobs.uploadImage(Number(route.params.id), imageFile.value);
      }

      toast.push({
        content: "Updated ad",
        color: "hsla(160, 22%, 46%)",
      });
      router.push({ name: "Admin" });
    };

    return {
      model,
      errors,
      tryCreateJobAd,
      imageFile,
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-8
  .flex.flex-col(class="w-1/2")
    h2.mb-4.text-brand Create event
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
      .h-64
        .text-lg.font-bold Image
          span.text-brand *
        UploadField.h-64(icon="camera", class="w-[400px]", v-model="imageFile")
      .flex-grow.flex.flex-col.h-full.justify-between
        div
          .text-lg.font-bold Closes on
            span.text-brand *
          RetroInput(v-model="model.closesOn", placeholder="yyyy-mm-dd")
          .text-brand.h-6 {{ errors.closesOn }}
        div
          .text-lg.font-bold URL
            span.text-brand *
          RetroInput(
            v-model="model.url",
            placeholder="https://datateknologer.se/ad"
          )
          .text-brand.h-6 {{ errors.url }}
    .flex.justify-end.pt-16.mb-16
      .btn(@click="tryCreateJobAd") Create
</template>
