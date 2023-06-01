const { Router } = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const router = Router()

router.get('/:id', auth, async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        title: `Пост ${post.title}`,
        post
    })
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const post = await Post.findById(req.params.id)

    res.render('postEdit', {
        title: `Редактировать ${post.title}`,
        post
    })
})

router.post("/edit", auth, async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Post.findByIdAndUpdate(id, req.body)
    res.redirect('/')
})

router.post('/remove', auth, async (req, res) => {
    try{
        await Post.deleteOne({_id: req.body.id})
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router