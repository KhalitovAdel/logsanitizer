import { AbstractLog } from './abstract.log';

export abstract class AbstractWithAdditionalLog<
    T extends object
> extends AbstractLog {
    constructor(
        transactionId: string,
        details: string,
        protected readonly additionalInformation: T
    ) {
        super(transactionId, details);
    }

    public override toJSON(): { transactionId: string } & T {
        return { ...super.toJSON(), ...this.additionalInformation };
    }
}
