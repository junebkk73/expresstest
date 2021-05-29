const express = require('express')
const expresshandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const fortunes = [
    "운좋음",
    "운보통",
    "운나쁨",
    "운없음",
]
app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {

    res.render('home')
})
app.get('/about', (req, res) => {
    const randomfortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomfortune })
})
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `express started on http://localhost:${port}; ` + `Press Ctrl-C to terminate....`
))