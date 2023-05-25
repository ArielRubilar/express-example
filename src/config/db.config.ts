import mongoose from "mongoose"

export const DB_CONFIG = {
    MONGO_URI: process.env.MONGO_URI || ''
} as const


const connect = (url: string) => {
    mongoose.connect(url).then(() => {
        console.log('Database Connected')
    })
}

export default {
    connect,
}
