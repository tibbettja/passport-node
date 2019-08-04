const fs = require('fs')
const path = require('path')
const router = new require('express').Router()
const config = require('../config/config')


fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file !== 'svc')
  .forEach(file => router.use(`/${file.split('.')[0]}`, require(path.join(__dirname, file))))

module.exports = router