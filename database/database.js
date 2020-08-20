const Sequelize = require('sequelize')

const conn = new Sequelize('blog_db', 'root', '', {
    host:'localhost',
    dialect:'mysql',
    timezone: '-04:00'
})

module.exports = conn
