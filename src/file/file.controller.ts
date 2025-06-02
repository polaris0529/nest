import { Controller, Post, UseInterceptors, UploadedFile, All, Render, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { getUploadOptions } from './file.utils';


@Controller('file')
export class FileController {


  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', undefined, getUploadOptions()))
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return { count: files.length };
  }

  @All('/view')
  @Render('upload')
  view() {
    console.log('view');
  }
}
