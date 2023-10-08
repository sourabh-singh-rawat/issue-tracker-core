import { NatsConnection } from "nats";

export interface MessageService {
  connect(): Promise<void>;
  client?: NatsConnection;
}
