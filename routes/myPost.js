const { Router } = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const router = Router()

function mapMyPosts(userPost) {
  return userPost.post.map(c => ({
    ...c.postId._doc,
    _id: c.postId._doc._id.toString()
  }))
}

router.get('/', async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'userPost.post.postId',
      model: 'Post'
    })
    .exec()

  const posts = mapMyPosts(user.userPost)
  console.log(posts)

  res.render('myPost', {
    title: 'Мои посты',
    isMyPost: true,
    posts: posts
  })
})

module.exports = router