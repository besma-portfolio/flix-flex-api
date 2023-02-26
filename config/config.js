import config from "dotenv"

config.config()

export default {
  app: {
    name: process.env.APP_NAME,
    port: process.env.APP_PORT,
    env: process.env.APP_ENV
  },
  database: {
    host: process.env.DATABASE_HOST,
    //port: process.env.DATABASE_PORT,
    //name: process.env.DATABASE_NAME
  },
  jwtSecret: process.env.JWT_SECRET,
  themoviedb: {
    url: process.env.THEMOVIEDB_URL,
    apiKey: process.env.THEMOVIEDB_API_KEY,
  }
  // filesPath: process.env.FILES_PATH
}
