import { FastifyReply, FastifyRequest } from "fastify";
import "@fastify/cookie";
import { Token } from "../crypto";
import { JwtPayload } from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../error";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: string | JwtPayload | null;
  }
}

export class Auth {
  // preHandler hook to set the current user
  static currentUser = (
    req: FastifyRequest,
    res: FastifyReply,
    next: () => void,
  ) => {
    // gets the accessToken from the cookies
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      req.currentUser = null;
      return next();
    }

    // verify accessToken
    try {
      req.currentUser = Token.verify(accessToken, process.env.JWT_SECRET!);
    } catch (error) {
      req.currentUser = null;
    } finally {
      next();
    }
  };

  static requireAuth = (
    req: FastifyRequest,
    res: FastifyReply,
    next: () => void,
  ) => {
    if (!req.currentUser) {
      throw new UnauthorizedError();
    }

    next();
  };

  static requireTokens = (
    req: FastifyRequest,
    res: FastifyReply,
    next: () => void,
  ) => {
    if (!req.cookies.accessToken || !req.cookies.refreshToken) {
      throw new BadRequestError("Bad request!");
    }
    next();
  };
}
