import * as process from 'process';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const APP_SECRET = process.env.APP_SECRET;
