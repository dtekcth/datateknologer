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
  path: "/auth",
  method: Method.GET,
  admin: true,
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (): Promise<Response> => {
  return Ok({});
};

export default new Endpoint(schema, handler);
