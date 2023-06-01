const {Router} = require('express')
const Post = require('../models/post')
const router = Router()

router.get('/', async (req, res) => {
    const posts = await Post.find()
    res.render('index', {
        title: 'Главная страница',
        isHome: true,
        isPosts: true,
        posts
    })
})

module.exports = router