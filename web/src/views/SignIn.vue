<template lang="pug">
.flex.justify-center.h-72
  form.flex.flex-col.justify-center.w-96(@submit.prevent="trySignIn")
    h2.mb-4 Sign in
    .mb-3
      .font-bold Password
      RetroInput(:password="true", v-model="password")
      .form-text.text-red(v-if="error") {{ error }}
    .flex.justify-end
      .btn(@click="trySignIn") Sign in
</template>

<script lang="ts">
import { useTheme } from "@plugins/theme";
import { useToastStore } from "@plugins/toaster";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "../plugins/api";

export default defineComponent({
  name: "SignIn",
  setup() {
    const router = useRouter();
    const toast = useToastStore();
    const theme = useTheme();
    const email = ref("");
    const password = ref("");
    const error: Ref<string | undefined> = ref(undefined);

    const trySignIn = async () => {
      const res = await api.auth.signIn(password.value);

      if (res) {
        router.push({ name: "Admin" });
      } else {
        toast.push({
          content: "Invalid password",
          color: "hsl(357, 46%, 52%)",
        });
      }
    };

    return {
      email,
      password,
      error,
      trySignIn,
    };
  },
});
</script>

<style lang="scss"></style>
