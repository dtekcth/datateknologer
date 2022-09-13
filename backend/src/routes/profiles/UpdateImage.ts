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
import { join } from "path";
import { randomUUID } from "crypto";
import { move } from "fs-extra";

const schema = {
  path: "/profiles/:id/image",
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
  const slug = Buffer.from(randomUUID()).toString("base64");
  const newPath = join(
    config.paths.data,
    Buffer.from(randomUUID()).toString("base64")
  );
  await move(files.image.path, newPath);
  const ev = await prisma.common.profile.update({
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
