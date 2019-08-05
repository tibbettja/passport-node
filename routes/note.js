const router = new require('express').Router()
const noteSvc = require('./svc/note_svc')
const response = require('../common/response')

router.use('/', (req, res, next) => {
    console.log('Note Router')
    next()
})

router.get('/all', async (req, res) => {
    try {
        var notes = await noteSvc.getNotes(req.user)
        return response.success(res, notes, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

router.post('/create', async (req, res) => {
    try {
        var reult = await noteSvc.createNote(req.user, req.body)
        return response.success(res, result, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

router.post('/update', async (req, res) => {
    try {
        await noteSvc.updateNote(req.user, req.body)
        return response.success(res, undefined, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

router.post('/delete', async (req, res) => {
    try {
        await noteSvc.deleteNote(req.user, req.body)
        return response.success(res, undefined, 200)
    } catch (e) {
        return response.failure(res, e.message, 500)
    }
})

module.exports = router