module.exports = {
  pathToStatic: process.env.PATH_TO_STATIC || '../../character_sheet/dist',
  sessionSecret: process.env.SESSION_SECRET || 'cisco disco',
  port: process.env.PORT || 8081,
  db: {
    name: 'database',
    username: 'username',
    password: 'password',
    options: {
      dialect: 'sqlite',
      storage: process.env.DB_PATH || './database.sqlite'
    }
  } 
}