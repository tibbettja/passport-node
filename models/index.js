const fs = require('fs')
const path = require('path') // dealing with path
const Sequelize = require('sequelize') // create sql object and connect to DB
const config = require('../config/config') // connect to port
const db = {} // declare db object

// declare sequelize object
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname) // read through current dir and give us an array of diff files
  .filter(file =>
    file !== 'index.js' // bcs we don't want to read this file
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file)) // joind dirname to path file, tell sqlz to import it
    db[model.name] = model // ex. dbUser = model
  })


sequelize.models.User.hasMany(sequelize.models.Note)

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db