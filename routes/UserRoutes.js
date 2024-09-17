const express=require('express')
const userController = require('../controllers/UserController')
const router = express.Router()

router.post('/authenticate', userController.authenticateUser)
router.post('/register', userController.registerUser)
router.get('/search', userController.getUserbyUsername)
router.get('/:id', userController.getUserbyId)

module.exports = router