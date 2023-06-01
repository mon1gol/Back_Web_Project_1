const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const varMiddleware = require('./middleware/variables')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const createPostRoutes = require('./routes/createPost')
const myPostRoutes = require('./routes/myPost')
const postRoutes = require('./routes/post')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://profile4634:123321@webproject1.if2zvkk.mongodb.net/post'
const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.static('img'))
app.use(express.static('icon'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/post', postRoutes)
app.use('/profile', profileRoutes)
app.use('/createPost', createPostRoutes)
app.use('/myPost', myPostRoutes)
app.use('/auth', authRoutes)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, { 
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()