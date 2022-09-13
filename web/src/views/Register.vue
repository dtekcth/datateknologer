<script lang="ts">
import { useToastStore } from "@plugins/toaster";
import { defineComponent, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@plugins/api";

export default defineComponent({
  name: "CreateEvent",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { id, foodWillBeServed } = route.query;
    const toast = useToastStore();
    const imageFile: Ref<File | undefined> = ref(undefined);
    const innerModel = {
      name: "",
      email: "",
      foodPreferences: "",
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
      name: [validators.required],
      email: [validators.required],
      foodPreferences: [],
    });

    const errors: Ref<Record<keyof typeof innerModel, string | undefined>> =
      ref({
        name: undefined,
        email: undefined,
        foodPreferences: undefined,
      });

    const tryRegister = async () => {
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

      const res = await api.events.register({
        id: Number(id),
        name: model.value.name,
        email: model.value.email,
        foodPreferences: model.value.foodPreferences,
      });

      toast.push({
        content: "You have been registered!",
        color: "hsla(160, 22%, 46%)",
      });
      router.push({ name: "Student" });
    };

    return {
      model,
      errors,
      tryRegister,
      imageFile,
      foodWillBeServed: foodWillBeServed === "true",
    };
  },
});
</script>

<template lang="pug">
.flex.justify-center.mt-8
  .flex.flex-col(class="w-1/2")
    h2.mb-4.text-brand Register
    .flex.gap-8
      .flex-grow
        .text-lg.font-bold Name
          span.text-brand *
        RetroInput(v-model="model.name")
        .text-brand.h-6 {{ errors.name }}
      .flex-grow
        .text-lg.font-bold Email
          span.text-brand *
        RetroInput(v-model="model.email")
        .text-brand.h-6 {{ errors.email }}
    div(v-if="foodWillBeServed")
      .text-lg.font-bold Food preferences
        span.text-brand *
      RetroInput(v-model="model.foodPreferences")
      .text-brand.h-6 {{ errors.foodPreferences }}

    .flex.justify-end.pt-4.mb-8
      .btn(@click="tryRegister") Register
</template>
