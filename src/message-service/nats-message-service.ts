import { Logger } from "pino";
import { ConnectionOptions, NatsConnection, connect } from "nats";
import { MessageService } from "./interfaces/message-service";

export class NatsMessageService implements MessageService {
  private readonly _logger;
  private readonly _connectionOptions;
  private _client?: NatsConnection;

  constructor(options: ConnectionOptions, logger: Logger) {
    this._logger = logger;
    this._connectionOptions = options;
  }

  // Connects to the nats client using connection options
  connect = async () => {
    const natsClient = await connect(this._connectionOptions);
    this._client = natsClient;

    this._logger.info(`Server connected to ${natsClient.info?.server_name}`);
  };

  public get client() {
    if (!this._client) {
      throw new Error("Client not connected");
    }

    return this._client;
  }
}