export class Tag {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

export class TaskTag extends Tag {
  static NAME = "Task";

  importance: string;

  constructor(color: string, importance: string) {
    super(TaskTag.NAME, color);
    this.importance = importance;
  }
}

export class ScheduledTag extends Tag {
  static NAME = "Date";
  date: string;

  constructor(color: string, date: string) {
    super(ScheduledTag.NAME, color);
    this.date = date;
  }
}
