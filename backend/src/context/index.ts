import { Config } from "@app/config";
import { Logger } from "@app/log";

import prisma from "@app/prisma";

export class Context {
  config: Config;
  prisma = prisma;

  log: Logger;

  constructor(config: Config, logger: Logger) {
    this.log = logger;
    this.config = config;

    // this.status = status;
  }
}
