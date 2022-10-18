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
import { ErrorCode } from "@app/server/codes";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import { config } from "process";

const schema = {
  path: "/events/register",
  method: Method.POST,
  admin: false,
  body: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    foodPreferences: z.string().optional(),
  }),
};

type Schema = typeof schema;
type Handler = EndpointHandler<Schema, Context>;

const handler: Handler = async (
  { body }: Request<Schema>,
  { prisma, config }: Context
): Promise<Response> => {
  const id = Number(body.id);
  const ev = await prisma.common.event.findUnique({
    where: {
      id,
    },
  });

  const tickets = await prisma.common.eventRegistration.count({
    where: {
      eventId: id,
    },
  });

  if (!ev) return Ok({});

  if (tickets >= ev?.maxParticipants) {
    return Err(ErrorCode.BadRequest, [
      {
        code: "MAX_PARTICIPANTS_REACHED",
        message:
          "The maximum amount of participants have already registered for this event.",
      },
    ]);
  }

  const hasAlreadyRegistered = await prisma.common.eventRegistration.count({
    where: {
      eventId: id,
      email: body.email,
    },
  });

  if (hasAlreadyRegistered == 1) {
    return Err(ErrorCode.BadRequest, [
      {
        code: "ALREADY_REGISTERED",
        message:
          "Someone has already registered themself for this event using this email address.",
      },
    ]);
  }

  const registration = await prisma.common.eventRegistration.create({
    data: {
      eventId: id,
      name: body.name,
      email: body.email,
      foodPreferences: body.foodPreferences,
      verificationCode: randomUUID(),
    },
  });

  let transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: config.email,
  });

  const ticketHtml = `You have been registered for our event: <b>${ev.title}</b>. You can find your ticket <a href="https://dag.dtek.se/en/ticket/${registration.verificationCode}">here</a>.`;
  const html = ev.mailTemplate
    ? ticketHtml + "<br><br>" + ev.mailTemplate
    : ticketHtml;
  transporter.sendMail({
    to: body.email,
    from: "DAG",
    subject: `Event ticket: ${ev.title}`,
    html,
  });

  return Ok(registration);
};

export default new Endpoint(schema, handler);
