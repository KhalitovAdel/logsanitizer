import { expect } from '@jest/globals';

import { AbstractLog } from '../../src/log/abstract.log';
import { ErrorLog } from '../../src/log/error.log';

describe('ErrorLog', () => {
    const transactionId = 'tr';
    const details = 'det';
    const errorMsg = 'err';
    const instance = new ErrorLog(transactionId, details, { err: errorMsg });

    it('should isValidAdditionalInformation get correct type', async () => {
        expect(
            ErrorLog.isValidAdditionalInformation({ err: 'err' })
        ).toBeTruthy();
    });

    it('should toJSON return correct object', async () => {
        const obj = instance.toJSON();
        expect(obj).toMatchObject({
            transactionId,
            err: errorMsg,
        });

        const { transactionId: tr, err, ...other } = obj;

        expect(!!Object.keys(other).length).toBeFalsy();
    });

    it('should getLevel return error', async () => {
        expect(instance.getLevel()).toEqual(AbstractLog.LogLevels.error);
    });
});
