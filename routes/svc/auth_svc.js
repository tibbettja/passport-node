const { sequelize } = require('../../models/')
const User = sequelize.models.User

module.exports = {
    async register ({ username, password }) {
        return await User.create({ username, password })
    },
    async login ({ username, password}) {
        var user = await User.findOne({ where: { username }})
        var ret = user.comparePassword(password)
        if (ret) {
            return user
        } else {
            return undefined
        }
    }
}