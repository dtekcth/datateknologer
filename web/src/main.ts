import "./std/global";
import "intl-pluralrules";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Chart, registerables } from "chart.js";
import { FluentBundle, FluentResource } from "@fluent/bundle";

import App from "./App.vue";
import { router } from "./router";
import loadComponents from "./plugins/components";
import ToasterPlugin from "./plugins/toaster";

import { LocalStorePlugin } from "./plugins/preferences";

const theme = localStorage.getItem("tp-theme");
document.documentElement.dataset["theme"] = theme ?? "light";

const start = async () => {
  const ComponentPlugin = await loadComponents();
  const pinia = createPinia();
  pinia.use(LocalStorePlugin);
  const app = createApp(App)
    .use(router)
    .use(pinia)
    .use(ComponentPlugin)
    .use(ToasterPlugin);

  app.mount("#app");
};

start();