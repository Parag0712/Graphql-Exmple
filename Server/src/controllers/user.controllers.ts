import User from '../models/user.js';

export const getUsers = async () => {
    const users = await User.find({})
    return users
}

export const createUser = async (username: string, email: string, password: string) => {
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
        return "user already exists"
    }
    const newUser = await User.create({ username, email, password })
    return "user created"
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email, password })
    return user
}

export const updateUser = async (id: string, username: string, email: string, password: string) => {
    const user = await User.findByIdAndUpdate(id, { username, email, password })
    return user
}

export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id)
    return user
}

