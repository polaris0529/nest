import { INestApplication, ValidationPipe  } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


// ...
export async function initApp(app: INestApplication) {
        

    await app.enableCors({
        origin: '*',
        // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // preflightContinue: false,
    });

    //console.log(join(__dirname, '..','build'))

    console.log(process.env.PORT);

    await app.listen(8080);    
}