import "@app/std/global";
import { build_config } from "@app/config";
import { Context } from "@app/context";
import Server from "@app/server";
import { program } from "commander";
import { Logger } from "./log";

import nodemailer from "nodemailer";

program
  .version(process.env.NPM_PACKAGE_VERSION ?? "Unknown version")
  .option("-c, --config <path>", "config path", "./config.json")
  .parse();

// const analysis_command = async () => {
// const options = program.opts();
// const prisma = new PrismaClient();
// await passthrough_for_editi(prisma, 1);
// const statistics = await import_folder("./statistics");
// if (options.analysis.first() in statistics) {
// prisma.common.$use(async (params, next) => {
//   const before = Date.now();
//   const result = await next(params);
//   const after = Date.now();
//   console.log(
//     `Query ${params.model}.${params.action} took ${after - before}ms`,
//   );
//   return result;
// });
// await statistics[options.statistic.first()](
//   prisma,
//   ...options.statistic.slice(1),
// );
// if (data.first() === undefined) {
//   console.info("No results");
//   return;
// }
// const res = data;
// if (options.max) {
//   res.take(Number(options.max));
// }
// console.table(res, Object.keys(data.first()));
// } else {
//   console.info("No such statistic");
//   console.info("Available statistics:");
//   for (const k of Object.keys(statistics)) {
//     console.info(`  ${k}`);
//   }
// }
// };

const main = async () => {
  const options = program.opts();
  const config = await build_config(options.config);

  Logger.init({
    disable_console: false,
    meta: {
      mode: process.env.NODE_ENV ?? "?",
      version: process.env.npm_package_version ?? "?",
      node_version: process.env.NODE_VERSION ?? "?",
    },
  });

  const logger = new Logger();
  const ctx = new Context(config, logger);

  const server = new Server({
    ctx,
    logger,
    root: "/api/v1/",
    adminPassword: config.admin_password,
  });

  await server.listen(config.host, config.port);
};

main().catch((e) => console.error(e));
