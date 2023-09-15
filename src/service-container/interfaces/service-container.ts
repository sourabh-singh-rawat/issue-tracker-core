import { Resolver } from "awilix";

export interface ServiceContainer<Services> {
  register<T extends Resolver<T>>(name: string, value: Resolver<T>): void;
  get<T extends keyof Services>(name: T): Services[T];
  has(name: string): boolean;
  dispose(): void;
}
