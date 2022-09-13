<template lang="pug">
.relative.bg-base-200.rounded.h-full
  .upload-button.flex.justify-center.items-center.text-center.h-full
    .overflow-hidden.w-full.h-full.relative(v-if="imgSrc")
      img.object-cover.center.w-full.h-full.rounded-xl(:src="imgSrc")
    div(v-else)
      .text(v-if="text") {{ text }}
      .center.fa.text-base-content.text-8xl(
        v-else-if="icon",
        :class="[`fa-${icon}`]"
      )
    input(ref="uploadInput", type="file", @input="onInput")

  .file.flex.items-center.p-2(v-if="modelValue")
    i.fa.file-icon.text-primary.pr-2(:class="modelValue.icon")
    span {{ modelValue.name }}
    //- i.fa.fa-times.fa-lg.text-accent.ms-auto(@click="remove(file)")

  //- .error(v-if="error") {{ error }}
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, PropType, ref, Ref } from "vue";

export default defineComponent({
  name: "UploadField",
  props: {
    modelValue: {
      required: false,
      type: Object as PropType<File & { icon: string }>,
    },
    text: {
      required: false,
      default: undefined as string | undefined,
    },
    icon: {
      required: false,
      default: undefined as string | undefined,
    },
    error: {
      required: false,
      default: "",
    },
    multi: {
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const uploadInput: Ref<HTMLInputElement | undefined> = ref(undefined);

    const getFileIcon = (type: string) => {
      const [category, kind] = type.split("/");
      if (kind == "pdf") {
        return "fa-file-pdf";
      }

      if (category == "image") {
        return "fa-file-image";
      }

      const documentMimeTypes = [
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "msword",
        "vnd.oasis.opendocument.text",
        "plain",
      ];
      if (documentMimeTypes.includes(kind)) {
        return "fa-file-alt";
      }

      const archiveMimeTypes = ["zip", "vnd.rar", "x-7z-compressed"];
      if (archiveMimeTypes.includes(kind)) {
        return "fa-file-archive";
      }

      return "fa-file";
    };

    const imgSrc: Ref<undefined | string> = ref(undefined);
    const rootClass = computed(() => {
      imgSrc ? { backgroundImage: imgSrc } : {};
    });

    const onInput = () => {
      const file = Array.from(uploadInput.value?.files ?? [])
        .map((f) => Object.assign(f, { icon: getFileIcon(f.type) }))
        .first();

      const [category, kind] = file.type.split("/");
      if (category === "image") {
        imgSrc.value = URL.createObjectURL(file);
      }

      emit("update:modelValue", file);
    };

    return {
      onInput,
      uploadInput,
      imgSrc,
      rootClass,
      slots,
    };
  },
});
</script>

<style lang="scss" scoped>
input[type="file"] {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
