import * as fs from 'fs/promises';
import path from 'path';
import _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';

/**this.logger.error(): void */

@Injectable()
export class FileReadUtils {

    private readonly logger = new Logger('FileReadUtils');
    private rootDir: string = process.cwd();

    public async getJsFiles(_path: string): Promise<string[]> {        

        const dirPath = await this.isDir(["public", "js", _path]);
    
        try {

            const files = await fs.readdir(dirPath);
            const jsFiles = files.filter(file => file.endsWith('.js')).map(file => path.join('/js',_path, file));
            return jsFiles

        } catch (error) {
            this.logger.error(error)
            throw error(error);
        }
    
    }

    public async getCssFiles(_path: string): Promise<string[]> {        

        const dirPath = await this.isDir(["public", "css", _path]);
    
        try {

            const files = await fs.readdir(dirPath);
            const cssFiles = files.filter(file => file.endsWith('.css')).map(file => path.join('/css', _path, file));
            return cssFiles

        } catch (error) {
            this.logger.error(error)
            throw error(error);
        }
    
    }

    public async getViewFiles(_path: string): Promise<string[]> {        

        const dirPath = await this.isDir(["public", "views", _path]);
    
        try {

            const files = await fs.readdir(dirPath);
            const cssFiles = files.filter(file => file.endsWith('.hbs')).map(file => path.join('/views', _path, file));
            return cssFiles

        } catch (error) {
            this.logger.error(error)
            throw error(error);
        }
    
    }


    public async isDir(_paths: string[]): Promise<string> {

        const dirPath = path.join(this.rootDir, ..._paths);

        try {
            const stat = await fs.stat(dirPath);

            if (!stat.isDirectory()) {
                this.logger.error('is not directory');
            }

            return dirPath;

        } catch (error) {
            throw error;
        }
    }

}