import chairmanProfile from "./assets/profiles/chairman.jpg.jpg;
import financialManagerProfile from "./assets/profiles/financialManager.jpg.jpg;
import eventsProfile from "./assets/profiles/events.jpg.jpg;
import logisticsProfile from "./assets/profiles/logistics.jpg.jpg;
import marketingProfile from "./assets/profiles/marketing.jpg.jpg;
import customerRelationsProfile from "./assets/profiles/customerRelations.jpg.jpg;
import communicationsProfile from "./assets/profiles/communications.jpg.jpg;

export const config = {
  profiles: [
    {
      pictureUrl: chairmanProfile,
      name: "Viktor Käll",
      title: "Chairman",
      email: "viktor.kall@.dtek.se",
    },
    {
      pictureUrl: financialManagerProfile,
      name: "Alfred Karlsson",
      title: "Treasurer",
      email: "alfred.karlsson@dag.dtek.se",
    },
    {
      pictureUrl: marketingProfile,
      name: "Gustav Bruhn",
      title: "Member",
      email: "gustav.bruhn@dag.dtek.se",
    },
    {
      pictureUrl: eventsProfile,
      name: "Salam Hani",
      title: "Member",
      email: "salam.hani@dag.dtek.se",
    },
    {
      pictureUrl: customerRelationsProfile,
      name: "Tim Karlsson",
      title: "Member",
      email: "tim.karlsson@dag.dtek.se",
    },
    {
      pictureUrl: communicationsProfile,
      name: "Filip Wallin",
      title: "Member",
      email: "filip.wallin@dag.dtek.se",
    },
    {
      pictureUrl: logisticsProfile,
      name: "Tobias Olsson",
      title: "Member",
      email: "tobias.olsson@dag.dtek.se",
    },
  ],
};
