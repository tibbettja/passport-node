const express = require('express')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const config = require('./config/config')
const { sequelize } = require('./models')
const User = sequelize.models.User
const routes = require('./routes')

const app = express()

app.use(express.static(path.join(__dirname, config.pathToStatic)))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())
app.use(require('cors')({ origin: ['http://localhost:8080'], credentials: true }))

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username}, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false)
        if (!user.comparePassword(password)) return done(null, false)
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findByPk(id)
    .then(user => {
        return done(null, user)
    }).catch(err => {
        return done(err, null)
    })
})

app.use('/api', routes)

sequelize.sync({ force: true })
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    })
