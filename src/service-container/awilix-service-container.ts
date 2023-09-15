import { Logger } from "pino";
import { AwilixContainer, Resolver } from "awilix";
import { ServiceContainer } from "./interfaces/service-container";

export class AwilixServiceContainer<Services>
  implements ServiceContainer<Services>
{
  private readonly _logger;
  private readonly _container;
  private readonly _services: {
    name: string;
    value: Resolver<unknown>;
  }[] = [];

  constructor(container: AwilixContainer, logger: Logger) {
    this._container = container;
    this._logger = logger;
  }

  /**
   * Adds a service to the services array
   * @param name
   * @param value
   */
  add = <T>(name: string, value: T): void => {
    this._services.push({ name, value: value as Resolver<T> });
  };

  /**
   * Register a service to the container
   * @param name - name of the service
   * @param value - class or object value to register
   */
  register<T>(name: string, value: T): void {
    this._container.register(name, value as Resolver<T>);
  }

  /**
   * Get a registered service by name
   * @param name - name of the service
   * @returns
   */
  get<T extends keyof Services>(name: T): Services[T] {
    return this._container.resolve<Services[T]>(name as string);
  }

  /**
   * Check if a service is registered
   * @param name
   * @returns
   */
  has(name: string): boolean {
    return this._container.hasRegistration(name);
  }

  /**
   * Register all services
   */
  connect = async () => {
    for (const service of this._services) {
      this._container.register(service.name, service.value);
    }

    this._logger.info("Services registered to the container");
  };

  /**
   * Dispose all the services registered
   */
  dispose(): void {
    this._container.dispose();
  }
}
