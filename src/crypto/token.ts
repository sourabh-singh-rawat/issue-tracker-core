import jwt from "jsonwebtoken";

export class Token {
  /**
   * Create a token
   * @param payload
   * @param secret
   * @returns
   */
  static create = (payload: object, secret: string) => {
    return jwt.sign(payload, secret, { algorithm: "HS512" });
  };

  /**
   * Verify a token
   * @param payload
   * @param secret
   */
  static verify = (payload: string, secret: string) => {
    return jwt.verify(payload, secret);
  };

  static decodeAccessToken = (payload: string) => {
    return jwt.decode(payload) as AccessToken;
  };

  static decodeRefreshToken = (payload: string) => {
    return jwt.decode(payload) as TokenBase;
  };
}

interface TokenBase {
  userId: string;
  iss: string;
  aud: string;
  sub: string;
  exp: number;
  jwtid: string;
  iat: number;
}

interface AccessToken extends TokenBase {
  email: string;
  createdAt: Date;
  isEmailVerified: boolean;
  displayName: string;
  userMetadata: { language: string };
  appMetadata: { roles: string[] };
}
