export abstract class AbstractLog {
  private date: Date = new Date();

  constructor(
    private readonly transactionId: string,
    private readonly details: string
  ) {}

  public abstract getLevel(): AbstractLog.LogLevels;

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): this {
    this.date = date;

    return this;
  }

  getDetails(): string {
    return this.details;
  }

  public toJSON() {
    return {
      transactionId: this.transactionId,
    };
  }
}

export namespace AbstractLog {
  export enum LogLevels {
    error = "error",
    info = "info",
    warn = "warn",
    debug = "debug",
  }
}
