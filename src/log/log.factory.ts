import { AbstractLog } from "./abstract.log";
import { DebugLog } from "./debug.log";
import { ErrorLog } from "./error.log";
import { InfoLog } from "./info.log";
import { WarnLog } from "./warn.log";

export class LogFactory {
  private static isValidPayloadFromRaw(
    raw: Record<string, any>
  ): raw is LogFactory.Payload {
    if (!("transactionId" in raw && "details" in raw)) return false;

    return (
      typeof raw["transactionId"] === "string" &&
      typeof raw["details"] === "string"
    );
  }

  public createLog(
    level: AbstractLog.LogLevels.error,
    payload: LogFactory.Payload<ErrorLog.AdditionalInformation>
  ): ErrorLog;

  public createLog(
    level: AbstractLog.LogLevels.warn,
    payload: LogFactory.Payload<ErrorLog.AdditionalInformation>
  ): WarnLog;

  public createLog(
    level: AbstractLog.LogLevels.debug,
    payload: LogFactory.Payload<DebugLog.AdditionalInformation>
  ): DebugLog;

  public createLog(
    level: AbstractLog.LogLevels.info,
    payload: LogFactory.Payload
  ): InfoLog;

  public createLog(level: string, payload: Record<string, any>): AbstractLog;
  public createLog(level: string, payload: Record<string, any>): AbstractLog {
    if (!LogFactory.isValidPayloadFromRaw(payload))
      throw new Error("Invalid payload");
    const { transactionId, details, ...other } = payload;

    switch (level) {
      case AbstractLog.LogLevels.error:
        if (!ErrorLog.isValidAdditionalInformation(other))
          throw new Error("Invalid payload");

        return new ErrorLog(payload.transactionId, payload.details, other);
      case AbstractLog.LogLevels.warn:
        if (!WarnLog.isValidAdditionalInformation(other))
          throw new Error("Invalid payload");

        return new WarnLog(payload.transactionId, payload.details, other);
      case AbstractLog.LogLevels.debug:
        if (!DebugLog.isValidAdditionalInformation(other))
          throw new Error("Invalid payload");

        return new DebugLog(payload.transactionId, payload.details, other);
      case AbstractLog.LogLevels.info:
        return new InfoLog(payload.transactionId, payload.details);
      default:
        throw new Error("Invalid level");
    }
  }
}

export namespace LogFactory {
  export type Payload<T extends object = {}> = {
    transactionId: string;
    details: string;
  } & T;
}
