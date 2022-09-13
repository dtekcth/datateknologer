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
  method: Method.POST,
  admin: true,
  body: z.object({}),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body }: Request<Schema>,
  { prisma }: Context
): Promise<Response> => {
  const profile = await prisma.common.profile.create({
    data: {
      name: "Name",
      title: "Title",
      email: "email",
    },
  });
  return Ok(profile);
};

export default new Endpoint(schema, handler);
