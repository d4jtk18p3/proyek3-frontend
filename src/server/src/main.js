import db from './db'
import server from './server'

db.authenticate().then(() => {
console.log('Database connection has been established successfully.')

server.listen(process.env.SERVER_PORT, () =>
    console.log(`Server app listening on port ${process.env.SERVER_PORT}!`)
  )
}).catch((error) => {
  console.error('Unable to connect to the database:', error)
})
