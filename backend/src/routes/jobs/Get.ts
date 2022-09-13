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
  path: "/jobs/:id",
  method: Method.GET,
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
  const event = await prisma.common.jobAd.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return Ok(event ?? {});
};

export default new Endpoint(schema, handler);
