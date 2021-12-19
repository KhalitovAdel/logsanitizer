import { InfoLog } from '../../dist/log/info.log';
import { AbstractLog } from '../../src/log/abstract.log';

describe('InfoLog', () => {
    const transactionId = 'tr';
    const details = 'det';
    const instance = new InfoLog(transactionId, details);

    it('should getLevel return error', async () => {
        expect(instance.getLevel()).toEqual(AbstractLog.LogLevels.info);
    });
});
