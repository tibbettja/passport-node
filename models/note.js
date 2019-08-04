const Model = require('sequelize').Model
const User = require('./user')

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {}
    Note.init({
        text: {
            type: DataTypes.STRING(2048)
        }
    }, {
        sequelize,
        modelName: 'Note'
    })
    return Note
}