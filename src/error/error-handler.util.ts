import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from ".";

export class ErrorHandler {
  static handleError(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    console.log(error);

    if (error instanceof ResponseError) {
      return reply.status(error.statusCode).send(error.serializeError());
    }

    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ errors: [{ message: "something went wrong" }] });
  }
}
