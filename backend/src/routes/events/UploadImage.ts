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
  path: "/events/:id/image",
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
  const extension = files.image.originalname.split(".").last();
  const slug = Buffer.from(randomUUID()).toString("base64") + extension;
  const newPath = join(config.paths.data, slug);
  await move(files.image.path, newPath);
  const ev = await prisma.common.event.update({
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
