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
    const codec = JSONCodec<T["payload"]>();
    await this._jetstreamClient.publish(this.subject, codec.encode(message));

    console.log(`Message published on ${this.subject} to stream`);
  };
}
