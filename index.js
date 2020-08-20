const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const conn = require('./database/database')
const ControllerCategories = require('./categories/ControllerCategories')
const ControllerArticles = require('./articles/ControllerArticles')
const Articles = require('./articles/Articles')
const Category = require('./categories/Category')

//loading view engine
app.set('view engine', 'ejs')

//loading static files
app.use(express.static('public'))

//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

conn.authenticate()
.then(() => {
    console.log("Connection successful!!!")
}).catch((error) => {
    console.log(error)
})

app.use('/', ControllerCategories)

app.use('/', ControllerArticles)

//Render all articles on the home page
app.get('/', (req, res) => {
    Articles.findAll().then(articles => {
        res.render('index', {articles: articles})
    })
})

//Access the text of the article through the slug
app.get('/:slug', (req, res) => {
    let slug = req.params.slug
    Articles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != null && article != "") {
            res.render('article', {article: article})
        } else {
            res.redirect('/')
        }
    }).catch( err => {
        res.redirect('/')
    })
})

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})
