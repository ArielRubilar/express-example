import mongoose from "mongoose"

const connect = async (url: string) => {
    await mongoose.connect(url)
    console.log('Database Connected')
}

export default {
    connect,
}
