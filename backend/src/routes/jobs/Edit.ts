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
const schema = {
  path: "/jobs",
  method: Method.PATCH,
  admin: true,
  body: z.object({
    id: z.number(),
    title: z.string().optional(),
    url: z.string().optional(),
    description: z.string().optional(),
    closesOn: z.string().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body, files }: Request<Schema>,
  { prisma, config }: Context
): Promise<Response> => {
  const ev = await prisma.common.jobAd.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      closesOn: body.closesOn ? parseISO(body.closesOn) : undefined,
      url: body.url,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
