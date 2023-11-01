interface TaskFormDataInputs {
  description: string;
  completed?: boolean;
  dueDate?: Date;
}

export class TaskFormData {
  description;
  completed?;
  dueDate?;

  constructor({ description, completed, dueDate }: TaskFormDataInputs) {
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
  }
}
