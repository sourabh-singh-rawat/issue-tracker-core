export interface ServiceResponseInputs<T> {
  data: T;
  dataCount?: number;
}

export class ServiceResponse<T> {
  data: T;
  dataCount?: number;

  constructor({ data, dataCount }: ServiceResponseInputs<T>) {
    this.data = data;
    this.dataCount = dataCount;
  }
}
