const Sequelize = require('sequelize')
const conn = require('../database/database')
const Category = require('../categories/Category')

const Article = conn.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {// é o conteúdo do artigo(texto)
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.hasMany(Article)//one to many relationship; one category has many articles
Article.belongsTo(Category)//an article belongs to a category; one to one relationship

/* Article.sync({force: true}) */

module.exports = Article
