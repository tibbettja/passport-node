const bcrypt = require('bcryptjs')
const Model = require('sequelize').Model
const Note = require('./note')

function hashPassword (user, options) {
    user.setDataValue('password', bcrypt.hashSync(user.password, 8))
}

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: hashPassword,
            beforeSave: hashPassword,
            beforeUpdate: hashPassword
        }
    })
    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    return User
}