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
    const { username } = req.body
    const { id } = req.user

    if (!username) {
        return res.status(400).send({ message: 'Username is required' })
    }
    
    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { username },
            { new: true }
        )

        if (!updateUser) {
            return res.status(404).send({ message: 'User does not exist' })
        }

        res.send({ message: 'User Successfully Updated', user: { username } })
    } catch (error) {
        res.status(500).send(error)
    }
}



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
    deleteUser
}