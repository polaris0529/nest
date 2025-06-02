import * as fs from 'fs/promises';
import * as path from 'path';
import hbs from "express-hbs";
import _ from 'lodash';

export async function registerPartials(dirPath: string) {

    const FULL_PATH = path.join(process.cwd(), dirPath);

    try {
        const stat = await fs.stat(FULL_PATH);

        if (!stat.isDirectory()) {

            console.log("!stat.isDirectory()");
            //const fileNames = await fs.readFile(FULL_PATH, 'utf-8');

        
        } else {

            const fileNames = await fs.readdir(FULL_PATH, 'utf-8');
            const hbsFiles = _.filter(fileNames, (f) => f.endsWith('.hbs'));

            for (const fileName of hbsFiles) {
                const filePath = path.join(FULL_PATH, fileName);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const partialName = path.basename(fileName, '.hbs');

                hbs.registerPartial(partialName, fileContent);
            }

            let { partials } = hbs.handlebars;
            console.log(partials)

        }         
    } catch (err) {
        console.error(`ENOENT : ${err}`);        
    }
}