import { AbstractLog } from './abstract.log';
import { ErrorLog } from './error.log';

export class WarnLog extends ErrorLog {
    public override getLevel(): AbstractLog.LogLevels {
        return AbstractLog.LogLevels.warn;
    }
}
