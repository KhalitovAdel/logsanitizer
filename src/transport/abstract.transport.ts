export abstract class AbstractTransport {
  public abstract exec(log: AbstractTransport.LogType): Promise<void>;

  public abstract close(): Promise<void>;
}

export namespace AbstractTransport {
  export interface LogType {
    toJSON(): Record<string, unknown>;
    getLevel(): string;
    getDate(): Date;
  }
}
