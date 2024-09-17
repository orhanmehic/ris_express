const {PrismaClient} = require("../node_modules/.prisma/client");
const prisma = new PrismaClient();

const PostsController = {
    getPosts: async (req,res) => {
        try {
            const posts = await prisma.posts.findMany({
                include: {
                    user: true, // Assuming you want to include the user details
                },
            });
            res.status(200).json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },
    createPost: async (req, res) => {
        const { userId, caption, imageUrl } = req.body;

        try {
            const post = await prisma.posts.create({
                data: {
                    userId,
                    caption,
                    imageUrl,
                },
            });

            res.status(201).json(post);
        } catch (e) {
            res.status(500).json({ error: 'Failed to create post' });
            console.error(e);
        }
    },
}
module.exports = PostsController