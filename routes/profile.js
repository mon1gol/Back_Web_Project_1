const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', (req, res) => {
    res.render('profile', {
        title: 'Профиль',
        isProfile: true
    })
})

module.exports = router