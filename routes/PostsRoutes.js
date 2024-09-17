const express = require('express')
const router = express.Router()
const postsController = require('../controllers/PostsController')

router.get('', postsController.getPosts)
router.post('/create', postsController.createPost)


module.exports = router