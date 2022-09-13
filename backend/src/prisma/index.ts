import { PrismaClient as CommonClient } from "./clients/common";

export default {
  common: new CommonClient(),
};
