// 远程地址
const REMOTE_ADDRESS = '129.28.191.26'

const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  type: "mysql",
  port: 3306,
  username: "root",
  password: "123456",
  database: "blog_test",
  useNewUrlParser: true,
  synchronize: true,
  logging: false,
  extra: {
    charset: "utf8mb4_unicode_ci"
  },
  entities: [
    "src/entities/**/*.ts"
  ],
  migrations: [
    "src/migration/**/*.ts"
  ],
  subscribers: [
    "src/subscriber/**/*.ts"
  ],
  cli: {
    entitiesDir: "entities",
    migrationsDir: "migration",
    subscribersDir: "subscriber"
  }
}

const prodConfig = {
  host: REMOTE_ADDRESS
}

const devConfig = {
  host: "localhost",
}

export default Object.assign(baseConfig, isProd ? prodConfig : devConfig)
