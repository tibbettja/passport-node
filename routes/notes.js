const router = new require('express').Router()
const noteSvc = require('./svc/note_svc')
const response = require('../common/response')

router.use('/', (req, res, next) => {
    console.log('Note Router')
    next()
})

router.get('/notes', async (req, res) => {
    try {
        var notes = await noteSvc.getNotes(req.user)
        response.success(res, notes, 200)
    } catch (e) {
        response.failure(res, e.message, 500)
    }
})

router.post('/note', async (req, res) => {
    try {
        var reult = await noteSvc.createNote(req.user, req.body)
        response.success(res, result, 200)
    } catch (e) {
        response.failure(res, e.message, 500)
    }
})

router.put('/note', async (req, res) => {
    try {
        await noteSvc.updateNote(req.user, req.body)
        response.success(res, undefined, 200)
    } catch (e) {
        response.failure(res, e.message, 500)
    }
})

router.delete('/note', async (req, res) => {
    try {
        await noteSvc.deleteNote(req.user, req.body)
        response.success(res, undefined, 200)
    } catch (e) {
        response.failure(res, e.message, 500)
    }
})

module.exports = router