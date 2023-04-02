const express = require('express')
const app = express()

const fs = require('fs')


app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

//localhost:8000
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if (title.trim()=== '' && description.trim()===''){
        res.render('create', {error: true})
    } else {
        fs.readFile('./data/blogs.json', (err, data) => {
            if (err) throw err

            const blogs = JSON.parse(data)

            blogs.push({
                id: id (),
                title: title,
                description: description,
            })

            fs.writeFile('./data/blogs.json', JSON.stringify(blogs), err => {
                if (err) throw err

                res.render('create', {success: true})
            })
        })
    }
})

const blogs = ['Some awesome blog title' , 'Some awesome blog title 2']

app.get('/blogs', (req, res) => {
    res.render('blogs', {blogs: blogs})
})

app.get('/blogs/detail', (req,res) => {
    res.render('detail')

})


app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000....')
})

 function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
}