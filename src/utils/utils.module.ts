import { Module } from '@nestjs/common';
import { FileReadUtils } from './FileReadUtils';

@Module({    
    providers: [FileReadUtils],
    exports: [FileReadUtils]
})
export class UtilsModule {}
