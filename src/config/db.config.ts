import mongoose from "mongoose"

export const DB_CONFIG = {
    MONGO_URI: process.env.MONGO_URI || ''
} as const


const connect = async (url: string) => {
    await mongoose.connect(url)
    console.log('Database Connected')
}

export default {
    connect,
}
