import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },

  routes: [
    {
      path: "/:pathMatch(.*)*",
      // beforeEnter: (to, from, next) => {
      //   const l = useLocalization();
      //   if (!l.locale) {
      //     l.setLocale(getPreferredLanguage());
      //     return next({ name: "Home", params: { lang: l.locale } });
      //   }

      //   const pref = getPreferredLanguage();
      //   if (pref && pref !== "en") {
      //     return next({ name: "Home", params: { lang: pref } });
      //   }
      //   next();
      // },
      redirect: { name: "Home", params: { lang: "en" } },
    },
    {
      path: "/:lang",
      beforeEnter(to, from, next) {
        // const l = useLocalization();
        // if (
        //   l.locale !== to.params.lang &&
        //   (l.locale === "en" || l.locale === "sv")
        // ) {
        //   return next({ name: "Home", params: { lang: l.locale } });
        // }
        // next();
        const langs = new Set(["en", "sv"]);
        if (!langs.has(to.params.lang as string)) {
          return next({ name: "Home", params: { lang: "en" } });
        }
        next();
      },
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "student",
          name: "Student",
          component: () => import("./views/Student.vue"),
        },
        {
          path: "sign-in",
          name: "SignIn",
          component: () => import("./views/SignIn.vue"),
        },
        {
          path: "event/register",
          name: "Register",
          component: () => import("./views/Register.vue"),
        },
        {
          path: "ticket/:code",
          name: "Ticket",
          component: () => import("./views/Ticket.vue"),
        },
        {
          path: "admin",
          name: "Admin",
          component: () => import("./views/admin/Index.vue"),
        },
        {
          path: "admin/event/create",
          name: "Admin/CreateEvent",
          component: () => import("./views/admin/CreateEvent.vue"),
        },
        {
          path: "admin/event/:id",
          name: "Admin/EditEvent",
          component: () => import("./views/admin/EditEvent.vue"),
        },
        {
          path: "admin/ticket/:code",
          name: "Admin/VerifyTicket",
          component: () => import("./views/admin/VerifyTicket.vue"),
        },
        {
          path: "admin/jobs/create",
          name: "Admin/CreateJobAd",
          component: () => import("./views/admin/CreateJobAd.vue"),
        },
        {
          path: "admin/jobs/:id",
          name: "Admin/EditJobAd",
          component: () => import("./views/admin/EditJobAd.vue"),
        },
      ],
    },
  ],
});

router.afterEach((to, from) => {
  if (to.hash) {
    const timeout = to.path == from.path ? 0 : 400;
    setTimeout(() => {
      document
        .getElementById(to.hash.replace("#", ""))
        ?.scrollIntoView({ behavior: "smooth" });
    }, timeout);
  }
});
