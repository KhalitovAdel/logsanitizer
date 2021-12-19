import { AbstractDecryption } from "./abstract.decryption";

export class StringLineDecryption extends AbstractDecryption {
  private readonly regexp =
    /(?<isoDate>(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)) - (?<logLevel>\w+) - (?<jsonData>{(.*?)})/;

  public override exec(value: string): AbstractDecryption.Result {
    const match = value.match(this.regexp);
    if (!match || !match?.groups) throw new Error(`Incorrect string ${value}`);

    if (typeof match.groups["isoDate"] !== "string")
      throw new Error(
        `Incorrect value ${match.groups["isoDate"]} in string ${value}`
      );
    if (typeof match.groups["logLevel"] !== "string")
      throw new Error(
        `Incorrect value ${match.groups["logLevel"]} in string ${value}`
      );
    if (
      typeof match.groups["jsonData"] !== "string" ||
      !StringLineDecryption.isCorrectJson(match.groups["jsonData"])
    )
      throw new Error(
        `Incorrect value ${match.groups["jsonData"]} in string ${value}`
      );

    const jsonData = JSON.parse(match.groups["jsonData"]);
    if (!StringLineDecryption.isStack(jsonData))
      throw new Error(`Invalid object data ${match.groups["jsonData"]}`);

    return {
      date: new Date(match.groups["isoDate"]),
      logLevel: match.groups["logLevel"],
      jsonData,
    };
  }

  private static isCorrectJson(value: string): boolean {
    try {
      return !!JSON.parse(value);
    } catch (e) {
      return false;
    }
  }

  private static isStack(
    payload: Record<string, any>
  ): payload is AbstractDecryption.Stack {
    if (
      !(
        "transactionId" in payload &&
        typeof payload["transactionId"] === "string"
      )
    )
      return false;

    return "details" in payload && typeof payload["details"] === "string";
  }
}
