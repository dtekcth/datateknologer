import chairmanProfile from "./assets/profiles/chairman.jpeg"
import financialManagerProfile from "./assets/profiles/tresurer.jpeg"
import viceChairmanProfile from "./assets/profiles/vicechairman.jpeg"
import prProfile from "./assets/profiles/prmanager.jpeg"

export const config = {
  profiles: [
    {
      pictureUrl: chairmanProfile,
      name: "Benjamin Amiri",
      title: "Chairman",
      email: "benjamin.amiri@dtek.se",
    },
    {
      pictureUrl: financialManagerProfile,
      name: "Dylan Babahajian",
      title: "Treasurer",
      email: "dylan.babahajian@dtek.se",
    },
    {
      pictureUrl: viceChairmanProfile,
      name: "Yahya Fakierah",
      title: "Vice Chairman",
      email: "yahya.fakeirah@dtek.se",
    },
    {
      pictureUrl: prProfile,
      name: "Patrik Ae",
      title: "PR Manager",
      email: "patrik.ae@dtek.se",
    },
  ],
};
