import { NatsConnection, JSONCodec } from "nats";
import { Message } from "../common/interfaces/message";

/**
 * Publisher to publish messages to nats jetstream.
 */
export abstract class Publisher<T extends Message> {
  abstract subject: T["subject"];
  private readonly _jetstreamClient;

  constructor(client: NatsConnection) {
    this._jetstreamClient = client.jetstream();
  }

  publish = async (message: T["payload"]) => {
    const codec = JSONCodec();
    const payload = JSON.stringify(message);

    await this._jetstreamClient.publish(this.subject, codec.encode(payload));

    console.log(`Message published on ${this.subject} to stream`);
  };
}
