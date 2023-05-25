import { config } from 'dotenv'
config()

import { DB_CONFIG } from './config/db.config'
import Logger from './logger/logger'
import router from './routers'
import server from './server'
import mongoDb from './db/mongo.db'



Logger.connect(console.log)

const app = server(router)

const PORT = process.env.PORT || 3000

mongoDb.connect(DB_CONFIG.MONGO_URI)

app.listen(PORT, () => {
  console.log(`🚀 app listening on port ${PORT}`)
})
