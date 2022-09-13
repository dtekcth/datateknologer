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
  path: "/events/:id/archive",
  method: Method.PATCH,
  admin: true,
  params: z.object({
    id: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { params }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const ev = await prisma.common.event.update({
    where: {
      id: Number(params.id),
    },
    data: {
      archived: true,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
