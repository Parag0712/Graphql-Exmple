import mongoose from 'mongoose'

export const connectDB = async (uri: string) => {
    try {   
        const connection = await mongoose.connect(uri)
        console.log(`Connected to MongoDB: ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`)
    }
}