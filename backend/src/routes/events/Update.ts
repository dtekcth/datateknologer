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
  path: "/events",
  method: Method.PATCH,
  admin: true,
  body: z.object({
    id: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    maxParticipants: z.number().optional(),
    registrationOpens: z.string().optional(),
    registrationCloses: z.string().optional(),
    foodWillBeServed: z.boolean().optional(),
    archived: z.boolean().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const parseDate = (str?: string) => (str ? parseISO(str) : undefined);

const handler: Handler = async (
  { body }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const ev = await prisma.common.event.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      date: parseDate(body.date),
      maxParticipants: body.maxParticipants,
      registrationOpens: parseDate(body.registrationOpens),
      registrationCloses: parseDate(body.registrationCloses),
      foodWillBeServed: body.foodWillBeServed,
      archived: body.archived,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
