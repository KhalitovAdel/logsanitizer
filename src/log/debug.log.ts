import { AbstractLog } from "./abstract.log";
import { AbstractWithAdditionalLog } from "./abstract-with-additional.log";

export class DebugLog extends AbstractWithAdditionalLog<DebugLog.AdditionalInformation> {
  private static isValidAdditionalInformationWithUserId(
    payload: Record<string, any>
  ): payload is DebugLog.AdditionalInformationWithUserId {
    return "userId" in payload && typeof payload["userId"] === "number";
  }

  private static isValidAdditionalInformationWithUser(
    payload: Record<string, any>
  ): payload is DebugLog.AdditionalInformationWithUser {
    return "user" in payload && typeof payload["user"] === "object";
  }

  public static isValidAdditionalInformation(
    payload: Record<string, any>
  ): payload is DebugLog.AdditionalInformation {
    return (
      DebugLog.isValidAdditionalInformationWithUserId(payload) ||
      DebugLog.isValidAdditionalInformationWithUser(payload)
    );
  }

  public override getLevel(): AbstractLog.LogLevels {
    return AbstractLog.LogLevels.debug;
  }
}

export namespace DebugLog {
  export interface AdditionalInformationWithUserId {
    userId: number;
  }

  export interface AdditionalInformationWithUser {
    user: Record<string, unknown>;
  }

  export type AdditionalInformation =
    | AdditionalInformationWithUserId
    | AdditionalInformationWithUser;
}
