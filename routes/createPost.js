const {Router} = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('createPost', {
        title: 'Создание поста',
        isCreatePost: true
    })
})

router.post('/', auth, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        img: req.body.img,
        userId: req.user
    })

    try{
        await post.save()
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router