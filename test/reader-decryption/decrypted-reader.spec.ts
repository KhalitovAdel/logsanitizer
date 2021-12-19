import { promises } from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';

import { LineReader } from '../../dist/reader';
import { StringLineDecryption } from '../../src/decryption';
import { DecryptedReader } from '../../src/reader-decryption/decrypted-reader';

describe('DecryptedReader', () => {
    const tmp = tmpdir();
    const projectFolder = 'decrypted-reader';
    const fileFolderPath = path.join(tmp, projectFolder);
    const filePath = path.join(fileFolderPath, 'kek.txt');

    const data = `2021-08-09T02:12:51.257Z - debug - {"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e978","details":"User information is gathered","user":{"id":10,"name":"Alice"}}`;

    beforeAll(async () => {
        await promises.mkdir(fileFolderPath, { recursive: true });
        await promises.writeFile(filePath, data, { encoding: 'utf-8' });
    });

    afterAll(async () => {
        await promises.rmdir(fileFolderPath, { recursive: true });
    });

    it('should async iterator works', async () => {
        const arr = new Array<unknown>();

        for await (const el of new DecryptedReader(
            new LineReader(filePath),
            new StringLineDecryption()
        )) {
            arr.push(el);
        }

        expect(!!arr.length).toBeTruthy();
        expect(typeof arr[0] === 'object').toBeTruthy();
    });
});
