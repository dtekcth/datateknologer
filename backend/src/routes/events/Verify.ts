import { z } from "zod";
import {
  Method,
  EndpointHandler,
  Request,
  Ok,
  Endpoint,
  Response,
  Err,
} from "@app/server/types";
import { Context } from "@app/context";

const schema = {
  path: "/events/ticket/verify",
  method: Method.POST,
  admin: true,
  body: z.object({
    code: z.string(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const ev = await prisma.common.eventRegistration.findUnique({
    where: {
      verificationCode: body.code,
    },
    include: {
      event: true,
    },
  });

  if (!ev) return Ok({ success: false });

  const ticket = await prisma.common.eventRegistration.update({
    where: {
      verificationCode: body.code,
    },
    data: {
      attended: true,
    },
  });
  return Ok({ success: true, event: ev.event.title, attendee: ticket.name });
};

export default new Endpoint(schema, handler);
