import { string, z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
} from "@app/server/types";
import { Context } from "@app/context";
import { parseISO } from "date-fns";
import { join } from "path";
import { randomUUID } from "crypto";
import { move } from "fs-extra";

const schema = {
  path: "/jobs/:id/image",
  method: Method.PUT,
  admin: true,
  params: z.object({
    id: z.string(),
  }),
  files: {
    image: 1,
  },
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params, files }: Request<Schema>,
  { prisma, config }: Context
): Promise<Response> => {
  const slug =
    Buffer.from(randomUUID()).toString("base64") +
    files.image.path.match(".*")?.skip(1).first();
  const newPath = join(config.paths.data, slug);
  await move(files.image.path, newPath);
  const ev = await prisma.common.jobAd.update({
    where: {
      id: Number(params.id),
    },
    data: {
      imageUrl: slug,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
