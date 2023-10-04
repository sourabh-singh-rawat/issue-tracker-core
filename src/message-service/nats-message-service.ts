import { Logger } from "pino";
import { ConnectionOptions, NatsConnection } from "nats";
import { MessageService } from "./interfaces/message-service";

export class NatsMessageService implements MessageService {
  private readonly logger;
  private readonly connectionOptions;
  private readonly connection;
  public client?: NatsConnection;

  constructor(
    connection: (opts?: ConnectionOptions) => Promise<NatsConnection>,
    connectionOptions: ConnectionOptions,
    logger?: Logger,
  ) {
    this.logger = logger;
    this.connection = connection;
    this.connectionOptions = connectionOptions;
  }

  // Connects to the nats client using connection options
  connect = async () => {
    const client = await this.connection(this.connectionOptions);
    this.client = client;

    this.logger?.info(`Server connected to ${client.info?.server_name}`);
  };
}
