import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';

export function multerFactory(): MulterOptions {
    return {
        storage: multer.diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
                console.log(req)
                const name = Buffer.from(file.originalname, 'latin1').toString('utf8');
                cb(null, name);
            },
        }),
        limits: { fileSize: 100 * 1024 * 1024 },
    };
}
