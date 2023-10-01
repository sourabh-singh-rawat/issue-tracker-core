import { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie";
import { BadRequestError, UnauthorizedError } from "../error";
import { AccessToken, JwtToken } from "../crypto";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: AccessToken;
  }
}

export class Auth {
  static currentUser = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const accessToken = request.cookies.accessToken;

    if (!accessToken) {
      return done();
    }

    try {
      request.currentUser = JwtToken.verify(
        accessToken,
        process.env.JWT_SECRET!,
      );
    } catch (error) {
      throw new UnauthorizedError("Token validation failed");
    } finally {
      done();
    }
  };

  static requireAuth = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.currentUser) {
      throw new UnauthorizedError();
    }

    done();
  };

  static requireTokens = (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    if (!request.cookies.accessToken || !request.cookies.refreshToken) {
      throw new BadRequestError("Bad request!");
    }
    done();
  };
}
