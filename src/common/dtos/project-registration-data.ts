import { ProjectStatus } from "../enums";

export interface ProjectRegistrationDataInputs {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;
}

export class ProjectRegistrationData {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate: Date;

  constructor({
    name,
    description,
    status,
    startDate,
    endDate,
  }: ProjectRegistrationDataInputs) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
