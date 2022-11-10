import { IUser } from './interfaces/user'

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string,
        DB_NAME: string,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_HOST: string,
        DB_PORT: number,
        SECRET_KEY: string,
        CRYPTO_KEY: string,
      }
    }
    namespace Express {
      interface Request {
         user?: IUser 
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}