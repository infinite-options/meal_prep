import dotenv from 'dotenv';

dotenv.config();

export const dev = process.env.NODE_ENV !== 'production';
