import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error";
import { BaseToken } from "./interfaces/base-token";
import { Token } from "./interfaces/token";
import { AccessToken, RefreshToken } from "./interfaces";

export class JwtToken implements Token {
  private static create = <T extends string>(payload: T, secret: string) => {
    return jwt.sign(payload, secret, { algorithm: "HS512" });
  };

  static verify = <T = BaseToken>(token: string, secret: string) => {
    try {
      return jwt.verify(token, secret) as T;
    } catch (error) {
      throw new UnauthorizedError();
    }
  };

  static createAccessToken = (payload: AccessToken, secret: string) => {
    return this.create(JSON.stringify(payload), secret);
  };

  static createRefreshToken = (payload: RefreshToken, secret: string) => {
    return this.create(JSON.stringify(payload), secret);
  };
}
