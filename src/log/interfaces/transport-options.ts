import { LogLevels } from "../enums/log-levels";
import { TransportType } from "../enums/transport-types";

export interface TransportOptions {
  type: TransportType;
  level?: LogLevels;
}
