export abstract class AbstractDecryption {
  public abstract exec(payload: string): AbstractDecryption.Result;
}

export namespace AbstractDecryption {
  export interface Stack {
    transactionId: string;
    details: string;
    [key: string]: any;
  }

  export interface Result {
    logLevel: string;
    date: Date;
    jsonData: Stack;
  }
}
