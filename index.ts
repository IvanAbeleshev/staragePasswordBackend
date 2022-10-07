import express from 'express'
import 'dotenv/config'

const server = express()
const portNumber = process.env.PORT || 7000

server.listen(portNumber, ()=>console.log(`Server started on port ${portNumber}`))