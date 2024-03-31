import * as mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

const DATABASE_URL = process.env.DATABASE_URL || '';

const client = mongoose.connect(DATABASE_URL);

export { client };
