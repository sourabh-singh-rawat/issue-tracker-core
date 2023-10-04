import jwt from "jsonwebtoken";
import { Token } from "./interfaces/token";
import { BaseToken } from "./interfaces";

export class JwtToken implements Token {
  static verify = <T extends BaseToken>(token: string, secret: string) => {
    return jwt.verify(token, secret) as T;
  };

  static create = <T>(payload: T, secret: string) => {
    return jwt.sign(JSON.stringify(payload), secret, { algorithm: "HS512" });
  };
}
