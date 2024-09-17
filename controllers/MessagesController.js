const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MessagesController = {
    // Get all followers for a user
    getAllUsers: async (req, res) => {
        const userId = parseInt(req.query.userId);
        console.log(userId)

        try {
            const users = await prisma.users.findMany({
                where:{
                    NOT:{
                        id: userId
                    }
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });

            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ error: 'Failed to fetch users' });
            console.error(e);
        }
    },


    // Get messages between two users
    getMessages: async (req, res) => {

        const { senderId} = req.query;
        const { receiverId} = req.params;

        try {
            const messages = await prisma.messages.findMany({
                where: {
                    OR: [
                        { senderId: parseInt(senderId), receiverId: parseInt(receiverId) },
                        { senderId: parseInt(receiverId), receiverId: parseInt(senderId) }
                    ]
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
            res.status(200).json(messages);
        } catch (e) {
            res.status(500).json({ error: 'Failed to fetch messages' });
            console.error(e);
        }
    },

    // Send a message
    sendMessage: async (req, res) => {
        const { senderId, receiverId, content } = req.body;
        console.log('salje se');
        console.log(senderId)
        console.log(receiverId)
        console.log(content)
        try {
            const message = await prisma.messages.create({
                data: {
                    senderId: senderId,
                    receiverId: receiverId,
                    content: content
                }
            });
            res.status(201).json(message);
        } catch (e) {
            res.status(500).json({ error: 'Failed to send message' });
            console.error(e);
        }
    }
};

module.exports = MessagesController;