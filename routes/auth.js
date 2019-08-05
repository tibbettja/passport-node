const router = new require('express').Router()
const authSvc = require('./svc/auth_svc')
const response = require('../common/response')

router.use('/', (req, res, next) => {
    console.log('Auth Router')
    next()
})

router.post('/register', async (req, res) => {
    try {
        var user = await authSvc.register(req.body)
        req.login(user, (err) => {
            if (err) {
                throw err
            }
        })
        return response.success(res, user.username, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

router.post('/login', async (req, res) => {
    try {
        var user = await authSvc.login(req.body)
        req.login(user, (err) => {
            if (err) {
                throw err
            }
        })
        return response.success(res, {}, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

router.get('/logout', async (req, res) => {
    try {
        req.logout()
        return response.success(res, {}, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

module.exports = router