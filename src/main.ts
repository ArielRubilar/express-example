import Logger from './logger/logger'
import server from './server'

Logger.connect(console.log)

const app = server()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 app listening on port ${PORT}`)
})
