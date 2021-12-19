import { promises } from 'fs';
import { tmpdir } from 'os';
import * as path from 'path';

import { LineReader } from '../../dist/reader';

describe('LineReader', () => {
    const tmp = tmpdir();
    const projectFolder = 'line-reader';
    const fileFolderPath = path.join(tmp, projectFolder);
    const filePath = path.join(fileFolderPath, 'kek.txt');
    const firstData = 'Hello';
    const secondData = 'world';

    const data = `${firstData}\n${secondData}`;

    beforeAll(async () => {
        await promises.mkdir(fileFolderPath, { recursive: true });
        await promises.writeFile(filePath, data);
    });

    afterAll(async () => {
        await promises.rmdir(fileFolderPath, { recursive: true });
    });

    it('should async iterator works', async () => {
        const arr = new Array<string>();

        for await (const el of new LineReader(filePath)) {
            arr.push(el);
        }

        expect(arr.join('\n')).toEqual(data);
    });
});
