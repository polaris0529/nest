import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from "helmet";
import * as cookieParser from 'cookie-parser';


export async function initApp(app: INestApplication) {
        
    //await app.enableCors({origin: 'http://localhost:5173', credentials: true,});
    //app.useGlobalPipes(new ValidationPipe({ whitelist: true }));    

    app
        .use(helmet())
        .use(cookieParser());


    await app.listen(process.env.PORT || 3000);    
}