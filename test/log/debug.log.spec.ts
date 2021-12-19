import { AbstractLog } from '../../src/log/abstract.log';
import { DebugLog } from '../../src/log/debug.log';

describe('DebugLog', () => {
    const transactionId = 'tr';
    const details = 'det';
    const userId = 123;
    const instance = new DebugLog(transactionId, details, { userId });

    it('should isValidAdditionalInformation get correct type', async () => {
        expect(DebugLog.isValidAdditionalInformation({ userId })).toBeTruthy();
    });

    it('should getLevel return error', async () => {
        expect(instance.getLevel()).toEqual(AbstractLog.LogLevels.debug);
    });
});
