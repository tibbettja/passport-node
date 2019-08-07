const { sequelize } = require('../../models/')
const Note = sequelize.models.Note
const User = sequelize.models.User

module.exports = {
    async getNotes (u) {
        var user = await User.findByPk(u.id)
        return await user.getNotes()
    },
    async createNote (u, { text }) {
        var user = await User.findByPk(u.id)
        var note = await Note.create({ text })
        await user.addNote(note)
        return { id: note.id }
    },
    async updateNote (u, { text, id }) {
        var note = await Note.findByPk(id)
        if (note === null || note === undefined) {
            throw new Error(`No Note with id ${id}.`)
        }
        if (u.id === note.UserId) {
            await note.update({ text })
        } else {
            throw new Error(`Note ${id} does not belong to User`)
        }
    },
    async deleteNote (u, { id }) {
        var note = await Note.findByPk(id)
        if (note === null || note === undefined) {
            throw new Error(`No Note with id ${id}.`)
        }
        if (u.id === note.UserId) {
            await note.destroy()
        } else {
            throw new Error(`Note ${id} does not belong to User`)
        }
    }
}