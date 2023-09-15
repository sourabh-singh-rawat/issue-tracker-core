import { JsMsg, NatsConnection } from "nats";
import { Streams } from "./enums/streams.enum";
import { Subjects } from "./enums/subjects.enum";

/**
 * Subscriber that consumers a particular consumer.
 */
export abstract class Subscriber {
  private readonly _jetstreamClient;

  constructor(client: NatsConnection) {
    this._jetstreamClient = client.jetstream();
  }

  // fetch messages
  fetchMessages = async () => {
    const consumer = await this._jetstreamClient.consumers.get(
      Streams.USER,
      Subjects.USER_CREATED,
    );

    const messages = await consumer.fetch({ max_messages: 10 });

    for await (const message of messages) {
      await this.onMessage(message);
    }
  };

  // processing for individual message
  abstract onMessage(message: JsMsg): Promise<void>;
}
