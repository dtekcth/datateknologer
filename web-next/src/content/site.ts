/* ============================================================
   SITE-WIDE CONTACT DETAILS & LINKS — edit in one place
   ============================================================
   Used by the footer, the company "Get in touch" form and the
   student "Get involved" form. The postal address lives in
   src/components/SiteFooter.vue (template).
============================================================ */

export const CONTACT = {
  /** company inquiries — footer + company page contact form */
  companyEmail: "dag@dtek.se",
  /** student "get involved" applications */
  boardEmail: "styrelsen@dtek.se",
} as const;

export const LINKS = {
  instagram: "https://www.instagram.com/dag.dtek/",
  linkedin: "https://www.linkedin.com/company/dag-chalmers/posts/?feedView=all",
} as const;

export const ORG_NR = "857209-7080";
