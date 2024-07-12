import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ClientError } from "./client-error";

type FastifyErrorhandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorhandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Invalid input", errors: error.flatten().fieldErrors });
  }

  if (error instanceof ClientError) {
    return reply
      .status(400)
      .send({ message: "Invalid input", errors: error.message });
  }

  return reply.status(500).send({ message: "Internal server error" });
};
