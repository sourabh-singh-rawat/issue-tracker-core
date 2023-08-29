import argon2 from "argon2";
import { randomBytes } from "crypto";

export class Hash {
  /**
   * Creates a hashed password using a given salt
   * @param password
   * @param salt
   */
  private static createWithSalt = async (password: string, salt: Buffer) => {
    const hashedPassword = await argon2.hash(password, { salt });

    return `${hashedPassword}#${salt.toString("hex")}`;
  };

  /**
   * Created a hashed password (salt included)
   * @param password password to hash
   * @returns password that is hashed with salt
   */
  static create = async (password: string): Promise<string> => {
    const salt = randomBytes(32);

    return this.createWithSalt(password, salt);
  };

  /**
   * Verifies
   * @param password
   */
  static verify = async (password: string, hash: string): Promise<boolean> => {
    return argon2.verify(hash, password);
  };
}
