import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || '9000',
    service: process.env.SERVICE || 'localhost',
};

export default config;