const { sequelize } = require('../../models/')
const Note = sequelize.models.Note

module.exports = {
    async getNotes (user) {
        return await user.getNotes()
    },
    async createNote (user, { text }) {
        var note = await Note.create({ text })
        await user.addNote(note)
        return { id: note.id }
    },
    async updateNote (user, { text, id }) {
        var note = await Note.findByPk(id)
        if (user.id === note.userId) {
            await note.update({ text })
        } else {
            throw new Error('Note does not belong to User')
        }
    },
    async deleteNote (user, { id }) {
        var note = await Note.findByPk(id)
        if (user.id === userId) {
            await note.destroy()
        } else {
            throw new Error('Note does not belong to User')
        }
    }
}