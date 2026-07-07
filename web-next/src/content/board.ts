/* ============================================================
   BOARD MEMBERS — edit this file when the committee changes
   ============================================================

   To swap a member:
     1. Drop their photo in  src/assets/board/  (portrait ~3:4 crop;
        it renders 240px wide, so ≥600px wide is plenty)
     2. Import it below and point the member's `photo` at it
     3. Update `name`, `email` and (if the post changes) `role`

   The array order is the display order on the site.
   Roles carry both languages; the site picks the right one.
============================================================ */

import chairmanUrl from "@/assets/board/chairman.jpg";
import vicechairmanUrl from "@/assets/board/vicechairman.jpg";
import tresurerUrl from "@/assets/board/tresurer.jpg";
import prmanagerUrl from "@/assets/board/prmanager.jpg";

export interface BoardMember {
  /** imported image url (see imports above) */
  photo: string;
  role: { en: string; sv: string };
  name: string;
  email: string;
}

export const BOARD: BoardMember[] = [
  {
    photo: chairmanUrl,
    role: { en: "Chairman", sv: "Ordförande" },
    name: "Benjamin Amiri",
    email: "benjamin.amiri@detek.se",
  },
  {
    photo: vicechairmanUrl,
    role: { en: "Vice chairman", sv: "Vice ordförande" },
    name: "Yahya Fakierah",
    email: "yahya.fakierah@dtek.se",
  },
  {
    photo: tresurerUrl,
    role: { en: "Treasurer", sv: "Kassör" },
    name: "Dylan Babahajan",
    email: "dylan.babahajan@dtek.se",
  },
  {
    photo: prmanagerUrl,
    role: { en: "PR manager", sv: "PR-ansvarig" },
    name: "Patrik Ae",
    email: "patrik.ae@dtek.se",
  },
];
