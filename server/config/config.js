import dotenv from 'dotenv';
dotenv.config();

export default{
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    // "host": 'host.docker.internal',
    "dialect": process.env.DB_DIALECT
  }
}