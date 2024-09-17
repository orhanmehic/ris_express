const express = require('express')
const router = express.Router()
const messagesRoutes = require('../controllers/MessagesController')

router.get('/users', messagesRoutes.getAllUsers)
router.get('/users/:receiverId', messagesRoutes.getMessages)
router.post('/send', messagesRoutes.sendMessage)

module.exports=router;