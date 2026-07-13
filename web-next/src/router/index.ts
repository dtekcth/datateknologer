import { createRouter, createWebHistory, START_LOCATION } from "vue-router";
import { coverScreen, revealScreen } from "@/composables/usePageTransition";

const langs = new Set(["en", "sv"]);

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home", params: { lang: "en" } },
    },
    {
      path: "/:lang",
      beforeEnter(to) {
        if (!langs.has(to.params.lang as string)) {
          return { name: "home", params: { lang: "en" } };
        }
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "student",
          name: "student",
          component: () => import("@/views/StudentView.vue"),
        },
        {
          path: "company",
          name: "company",
          component: () => import("@/views/CompanyView.vue"),
        },
        /* operational pages — registration emails link to
           /en/ticket/<code> (the URL is baked into the backend's mail
           text) and the ticket QR opens /en/admin/ticket/<code> */
        {
          path: "ticket/:code",
          name: "ticket",
          component: () => import("@/views/TicketView.vue"),
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("@/views/AdminView.vue"),
        },
        {
          path: "admin/ticket/:code",
          name: "admin-ticket",
          component: () => import("@/views/AdminTicketView.vue"),
        },
      ],
    },
  ],
});

// page transition (skipped on the initial navigation — the intro loader
// covers that — and on lang toggles). the camera dolly belongs to leaving
// the landing page; every other swap (student ↔ company) is a plain fade
router.beforeEach(async (to, from) => {
  if (from === START_LOCATION) return;
  if (to.name === from.name) return;
  await coverScreen(from.name === "home" ? "dolly" : "fade");
});

router.afterEach((to) => {
  document.documentElement.lang = (to.params.lang as string) || "en";
  revealScreen();
});
