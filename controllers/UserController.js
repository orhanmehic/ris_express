const bcrypt = require("bcrypt");
const {PrismaClient} = require("../node_modules/.prisma/client");
const prisma = new PrismaClient();

const userController = {
    authenticateUser: async (req, res) => {
        const {username, password} = req.body;


        try {

            const user = await prisma.users.findFirst({
                where: { username }
            });

            // If user not found or password doesn't match
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Return successful authentication
            res.status(201).json(user);
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            // Check if username or email already exists
            const existingUser = await prisma.users.findFirst({
                where:{username}
            });

            // If user already exists, return error
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user in the database
            const newUser = await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            });

            res.status(201).json({ message: 'User registered successfully', user: newUser });
            console.log("success")
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserbyUsername:async (req,res) => {
        const { query } = req.query.query;
        try {
            const users = await prisma.users.findMany({
                where: {
                    username: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
                select: {
                    id: true,
                    username: true,
                    email: true
                },
            });
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ error: 'Failed to search users' });
        }
    },
    getUserbyId: async (req,res) =>{
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma.users.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    // Add other fields as necessary
                },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (e) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
}

module.exports = userController