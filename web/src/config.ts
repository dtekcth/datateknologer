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
      name: "August Ådahl",
      title: "Chairman",
      email: "august.adahl@dtek.se",
    },
    {
      pictureUrl: financialManagerProfile,
      name: "Mia Heljeberg",
      title: "Treasurer",
      email: "mia.heljeberg@dtek.se",
    },
    {
      pictureUrl: marketingProfile,
      name: "Oscar Morisbak Olsson",
      title: "Member",
      email: "oscar.morisbakolsson@dtek.se",
    },
    {
      pictureUrl: eventsProfile,
      name: "Arvid Boisen",
      title: "Member",
      email: "arvid.boisen@dtek.se",
    },
    {
      pictureUrl: customerRelationsProfile,
      name: "Oksar Sköld",
      title: "Member",
      email: "oskar.skold@dtek.se",
    },
    {
      pictureUrl: communicationsProfile,
      name: "Rasmus Helgesson",
      title: "Member",
      email: "rasmus.helgesson@dtek.se",
    },
  ],
};
