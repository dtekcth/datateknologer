<template lang="pug">
.w-full.relative.border-transparent
  .retro-input.relative.border-transparent.pt-2(
    :class="{ 'items-end': label }",
    class="min-h-[10rem]"
  )
    textarea.bg-transparent.w-full(
      class="focus:outline-none disabled:opacity-75 disabled:select-none",
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }",
      :placeholder="placeholder",
      :disabled="disabled",
      name="field",
      v-model="modelValue",
      @input="update",
      @focus="focus = true",
      @blur="blur"
    )
    .underline.transition.duration-300.w-full.bg-primary.absolute.bottom-0.right-0(
      class="h-[2px]",
      :style="{ transform: `scaleX(${focus ? 1 : 0})` }"
    ) 
  //- .absolute.transition-all.pl-3.pointer-events-none(
  //-   :style="labelStyle",
  //-   :class="{ 'text-secondary': activated }"
  //- ) {{ label }}
  .h-4.w-full.text-sm.text-error(v-if="validation") {{ v$.field.$errors.first()?.$message ?? " " }}
</template>

<script lang="ts">
import useVuelidate, { Validation } from "@vuelidate/core";
import { computed, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "RetroTextbox",
  props: {
    modelValue: {
      required: true,
    },
    label: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    disabled: {
      default: false,
    },
    validation: {
      required: false,
      type: Object as PropType<Array<Validation>>,
    },
  },
  setup(props, { emit }) {
    const focus = ref(false);
    const activated = computed(
      () =>
        focus.value ||
        props.modelValue !== undefined ||
        props.modelValue !== "",
    );
    const labelStyle = computed(() => ({
      transform: `translateY(${
        activated.value || props.placeholder ? -2.6 : -2.1
      }rem)`,
      fontSize: `${activated.value || props.placeholder ? 0.7 : 1.125}rem`,
    }));

    const update = (event: any) => {
      emit("update:modelValue", event.target?.value);
      emit("input", event.target?.value);
    };

    const showPassword = ref(false);

    const rules = {
      field: { ...props.validation },
    };
    const field = ref(props.modelValue);

    const v$ = useVuelidate(rules, { field }, { $rewardEarly: true });

    const validate = async () => {
      await v$.value.$validate;
    };

    const blur = () => {
      focus.value = false;
      v$.value.field.$commit();
    };

    return {
      update,
      focus,
      activated,
      labelStyle,
      validate,
      blur,
      v$,
    };
  },
});
</script>
