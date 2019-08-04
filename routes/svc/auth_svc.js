const { sequelize } = require('../../models/')
const User = sequelize.models.User

module.exports = {
    async register ({ username, password }) {
        return await User.create({ username, password })
    }
}