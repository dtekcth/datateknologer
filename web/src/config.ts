import chairmanProfile from "./assets/profiles/chairman.jpg"
import financialManagerProfile from "./assets/profiles/financialManager.jpg"
import eventsProfile from "./assets/profiles/events.png"
import logisticsProfile from "./assets/profiles/logistics.jpg"
import marketingProfile from "./assets/profiles/marketing.jpg"
import customerRelationsProfile from "./assets/profiles/customerRelations.jpg"
import communicationsProfile from "./assets/profiles/communications.jpg"

export const config = {
  profiles: [
    {
      pictureUrl: chairmanProfile,
      name: "Martin Martinsson",
      title: "Chairman",
      email: "martin.martinsson@dtek.se",
    },
    {
      pictureUrl: financialManagerProfile,
      name: "Leo Wivhagen",
      title: "Treasurer",
      email: "leo.wivhagen@dtek.se",
    },
    {
      pictureUrl: marketingProfile,
      name: "Axel Marklén",
      title: "Member",
      email: "axel.marklen@dtek.se",
    },
    {
      pictureUrl: eventsProfile,
      name: "Melvin Berg",
      title: "Member",
      email: "melvin.berg@dtek.se",
    },
    {
      pictureUrl: customerRelationsProfile,
      name: "Lukas Söderberg",
      title: "Member",
      email: "lukas.soderberg@dtek.se",
    },
    {
      pictureUrl: communicationsProfile,
      name: "Daniel Husberg",
      title: "Member",
      email: "daniel.husberg@dtek.se",
    },
    {
      pictureUrl: logisticsProfile,
      name: "Jesper Wärn",
      title: "Member",
      email: "jesper.warn@dtek.se",
    },
  ],
};
