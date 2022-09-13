import { en } from "./en";
import { sv } from "./sv";

// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = {
  ui: {};
  pages: {};
};
import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export type AvailableLocales = "en" | "sv";

interface State {
  // locale?: AvailableLocales;
  messages: {
    [K in AvailableLocales]: MessageSchema;
  };
}

export const getPreferredLanguage = (): AvailableLocales => {
  {
    const lang = localStorage.getItem("tp-lang");
    if (lang) return lang as AvailableLocales;
  }

  const lang = window.navigator.language;
  if (/^sv/.test(lang)) return "sv";
  return "en";
};

export const useLocalization = defineStore("Localization", {
  state: (): State => ({
    // locale: localStorage.getItem("tp-lang") as any,
    messages: {
      en,
      sv,
    },
  }),
  actions: {
    setLocale(lang: AvailableLocales) {
      // this.locale = lang;
      localStorage.setItem("tp-lang", lang);
    },
    title(caption: string) {
      return `TentaPortalen | ${caption}`;
    },
  },
  getters: {
    locale: (): AvailableLocales => {
      const route = useRoute();
      return (route.params.lang as AvailableLocales) ?? "en";
    },
    tl: (state) => {
      const route = useRoute();
      return state.messages[(route.params.lang as AvailableLocales) ?? "en"];
    },
  },
});
