import chairmanProfile from "./assets/profiles/chairman.jpg"
import financialManagerProfile from "./assets/profiles/treasurer.jpg"
import viceChairmanProfile from "./assets/profiles/vicechairman.jpg"
import prProfile from "./assets/profiles/prmanager.jpg"

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
