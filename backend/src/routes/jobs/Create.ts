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
  method: Method.POST,
  admin: true,
  body: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string(),
    closesOn: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body, files }: Request<Schema>,
  { prisma, config }: Context
): Promise<Response> => {
  const ev = await prisma.common.jobAd.create({
    data: {
      title: body.title,
      description: body.description,
      closesOn: parseISO(body.closesOn),
      url: body.url,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
