const express = require('express');
const userRoutes = require('./routes/UserRoutes')
const postsRoutes = require('./routes/PostsRoutes')
const messagesRoutes = require('./routes/MessagesRoutes')
const cors = require('cors');
const port = 3003;

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes)
app.use('/api/chats', messagesRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;