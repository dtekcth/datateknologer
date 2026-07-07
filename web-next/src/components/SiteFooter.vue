<script setup lang="ts">
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import { CONTACT, LINKS, ORG_NR } from "@/content/site";
import logoUrl from "@/assets/logo-full-light.svg";

const { lang } = useLocale();

/* contact details & links live in src/content/site.ts — edit them there */
const EMAIL = CONTACT.companyEmail;
const INSTAGRAM = LINKS.instagram;
const LINKEDIN = LINKS.linkedin;

const year = new Date().getFullYear();

const copy = computed(() =>
  lang.value === "sv"
    ? {
        tagline: "Datateknologsektionens arbetsmarknadsgrupp på Chalmers.",
        contact: "Kontakt",
        visit: "Besök",
        follow: "Följ oss",
        org: "Organisation",
        orgNr: "Org.nr",
        rights: "Alla rättigheter förbehållna.",
      }
    : {
        tagline: "The career committee of the CSE student division at Chalmers.",
        contact: "Contact",
        visit: "Visit",
        follow: "Follow",
        org: "Organisation",
        orgNr: "Org. number",
        rights: "All rights reserved.",
      },
);
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="brand">
        <img class="logo" :src="logoUrl" alt="DAG" />
        <p class="tagline">{{ copy.tagline }}</p>
      </div>

      <nav class="cols">
        <div class="col">
          <h4>{{ copy.contact }}</h4>
          <a class="link" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
        </div>

        <div class="col">
          <h4>{{ copy.visit }}</h4>
          <address class="address">
            Datateknologsektionen Chalmers Studentkår<br />
            Rännvägen 8<br />
            412 58 Göteborg
          </address>
        </div>

        <div class="col">
          <h4>{{ copy.follow }}</h4>
          <a
            class="link"
            :href="INSTAGRAM"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            class="link"
            :href="LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <div class="col">
          <h4>{{ copy.org }}</h4>
          <p class="muted">{{ copy.orgNr }} {{ ORG_NR }}</p>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <span>© {{ year }} DAG · {{ copy.rights }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-mono);
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 72px 48px 48px;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 48px;
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 320px;
}

.logo {
  height: 52px;
  width: auto;
  align-self: flex-start;
}

.tagline {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--paper) 70%, transparent);
}

.cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col h4 {
  margin: 0 0 4px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--orange-bright);
}

.link {
  color: var(--paper);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 0.02em;
  width: fit-content;
  transition: color 150ms var(--ease-out);
}

.link:hover {
  color: var(--orange-bright);
}

.address {
  margin: 0;
  font-style: normal;
  font-size: 13px;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--paper) 68%, transparent);
}

.muted {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--paper) 68%, transparent);
}

.footer-bottom {
  border-top: 1px solid color-mix(in srgb, var(--paper) 18%, transparent);
}

.footer-bottom span {
  display: block;
  max-width: 1120px;
  margin: 0 auto;
  padding: 22px 48px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--paper) 55%, transparent);
}

@media (max-width: 780px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 56px 24px 40px;
  }

  .cols {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .footer-bottom span {
    padding: 20px 24px;
  }
}

@media (max-width: 460px) {
  .cols {
    grid-template-columns: 1fr;
  }
}
</style>
