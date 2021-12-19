import { AbstractLog } from '../../src/log/abstract.log';
import { WarnLog } from '../../src/log/warn.log';

describe('WarnLog', () => {
    const transactionId = 'tr';
    const details = 'det';
    const errorMsg = 'err';
    const instance = new WarnLog(transactionId, details, { err: errorMsg });

    it('should isValidAdditionalInformation get correct type', async () => {
        expect(
            WarnLog.isValidAdditionalInformation({ err: 'err' })
        ).toBeTruthy();
    });

    it('should toJSON return correct object', async () => {
        expect(instance.toJSON()).toMatchObject({
            transactionId,
            err: errorMsg,
        });
    });

    it('should getLevel return error', async () => {
        expect(instance.getLevel()).toEqual(AbstractLog.LogLevels.warn);
    });
});
