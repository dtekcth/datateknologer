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
  path: "/jobs",
  method: Method.GET,
  admin: false,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { query }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const events = await prisma.common.jobAd.findMany({
    orderBy: {
      timestamp: "asc",
    },
  });

  return Ok(events);
};

export default new Endpoint(schema, handler);
