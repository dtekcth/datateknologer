import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
} from "@app/server/types";
import { Context } from "@app/context";

const schema = {
  path: "/profiles",
  method: Method.PATCH,
  admin: true,
  body: z.object({
    id: z.number(),
    name: z.string().optional(),
    title: z.string().optional(),
    email: z.string().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const ev = await prisma.common.profile.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      title: body.title,
      email: body.email,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
