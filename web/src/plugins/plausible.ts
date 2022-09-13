import Plausible from "plausible-tracker";
import { App } from "vue";

const plausible = Plausible({
  domain: "tenta.davebay.net",
  apiHost: "https://m.davebay.net",
});

plausible.enableAutoPageviews();
plausible.enableAutoOutboundTracking();

export const usePlausible = () => plausible;
