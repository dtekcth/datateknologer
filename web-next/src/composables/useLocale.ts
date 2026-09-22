import { computed } from "vue";
import { useRoute } from "vue-router";

export type Lang = "en" | "sv";

export const useLocale = () => {
  const route = useRoute();
  const lang = computed<Lang>(() => (route.params.lang === "sv" ? "sv" : "en"));
  const otherLang = computed<Lang>(() => (lang.value === "sv" ? "en" : "sv"));
  return { lang, otherLang };
};
