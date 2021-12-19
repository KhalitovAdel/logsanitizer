import { AbstractLog } from './abstract.log';
import { AbstractWithAdditionalLog } from './abstract-with-additional.log';

export class ErrorLog extends AbstractWithAdditionalLog<ErrorLog.AdditionalInformation> {
    public static isValidAdditionalInformation(
        payload: Record<string, any>
    ): payload is ErrorLog.AdditionalInformation {
        return 'err' in payload && typeof payload['err'] === 'string';
    }

    public override getLevel(): AbstractLog.LogLevels {
        return AbstractLog.LogLevels.error;
    }

    public override toJSON(): {
        transactionId: string;
    } & ErrorLog.AdditionalInformation {
        return {
            transactionId: super.toJSON().transactionId,
            err: this.additionalInformation.err,
        };
    }
}

export namespace ErrorLog {
    export interface AdditionalInformation {
        err: string;
    }
}
