import Logger from './logger/logger'
import router from './routers'
import server from './server'

Logger.connect(console.log)

const app = server(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 app listening on port ${PORT}`)
})
