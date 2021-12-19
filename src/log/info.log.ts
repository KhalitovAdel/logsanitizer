import { AbstractLog } from "./abstract.log";

export class InfoLog extends AbstractLog {
  public override getLevel(): AbstractLog.LogLevels {
    return AbstractLog.LogLevels.info;
  }
}
