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
  path: "/events/upcoming",
  method: Method.GET,
  admin: false,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const events = await prisma.common.event.findMany({
    orderBy: {
      date: "asc",
    },
    where: {
      date: {
        gte: new Date(),
      },
      archived: false,
    },
  });

  const res = await Promise.all(
    events.map(async (e) =>
      Object.assign(e, {
        tickets: await prisma.common.eventRegistration.count({
          where: {
            eventId: e.id,
          },
        }),
      })
    )
  );
  return Ok(res);
};

export default new Endpoint(schema, handler);
