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
  method: Method.POST,
  admin: true,
  body: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    maxParticipants: z.number(),
    registrationOpens: z.string(),
    registrationCloses: z.string(),
    foodWillBeServed: z.boolean(),
  }),
  // files: {
  //   image: 1,
  // },
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body, files }: Request<Schema>,
  { prisma, config }: Context
): Promise<Response> => {
  // const slug = Buffer.from(randomUUID()).toString("base64");
  // const newPath = join(
  //   config.paths.data,
  //   Buffer.from(randomUUID()).toString("base64")
  // );
  // await move(files.image.path, newPath);
  const ev = await prisma.common.event.create({
    data: {
      title: body.title,
      description: body.description,
      date: parseISO(body.date),
      maxParticipants: body.maxParticipants,
      registrationOpens: parseISO(body.registrationOpens),
      registrationCloses: parseISO(body.registrationCloses),
      foodWillBeServed: body.foodWillBeServed,
      // imageUrl: slug,
    },
  });
  return Ok(ev);
};

export default new Endpoint(schema, handler);
