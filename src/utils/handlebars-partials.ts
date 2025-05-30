import * as fs from 'fs/promises';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import _ from 'lodash';

export async function registerPartials(dirPath: string) {

    const FULL_PATH = path.join(process.cwd(), dirPath);

    try {
        const stat = await fs.stat(FULL_PATH);

        if (!stat.isDirectory()) {
            //throw new Error(`❌ ${FULL_PATH} is not a directory.`);
        }

        const fileNames = await fs.readdir(FULL_PATH, 'utf-8');
        const hbsFiles = _.filter(fileNames, (f) => f.endsWith('.hbs'));

        for (const fileName of hbsFiles)
        {
            const filePath = path.join(FULL_PATH, fileName);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const partialName = path.basename(fileName, '.hbs');

            Handlebars.registerPartial(partialName, fileContent);
        }


    } catch (err) {
        console.error(`ENOENT : ${err}`);
        throw err;
    }
}