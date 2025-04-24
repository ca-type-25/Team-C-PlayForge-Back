const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const process = require('process')

const User = require("../models/userModel")

const register = async (req, res) => {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' })
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        const message = existingUser.email === email
            ? 'Email already exists'
            : 'Username already exists'
        return res.status(400).send({ message })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

        res.send({ message: 'User registered successfully' })
    } catch (error) {
        res.status(500).send(error)
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ message: 'Invalid email or password' })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' })
        }

        const token = jwt.sign(
            {
                username: user.username,
                email: user.email,
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )

        

        res.send({ message: 'User Successfully Logged In', token, username: user.username })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    try {
   
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).send({ message: 'Unauthorized' });
        }

        if (req.user.role !== 'admin' && updates.role) {
            return res.status(403).send({ 
                message: 'Only admins can change user roles' 
            });
        }

        // Hash password if it's being updated
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ 
            message: 'User updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        res.status(400).send({ 
            message: 'Update failed', 
            error: error.message 
        });
    }
};

const changeUserRole = async (req, res) => {

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can change roles.' });
    }
    const { id } = req.params;
    const { role } = req.body;


    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'Role updated.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.send(users)

    } catch (error) {
        res.status(500).send(error)
    }
}


const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }

        res.send(user)
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found.' })
        }

        res.send({ message: 'User record was removed', data: deletedUser })

    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    register,    //veikia kaip iprastas create route siuo atveju?
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    changeUserRole
}