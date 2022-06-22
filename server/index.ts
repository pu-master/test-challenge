import express, { Express, Request, Response } from 'express'
import http, { Server } from 'http'
import { resolve } from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import createServer from './graphql/createServer'

const PORT: string|number = process.env.PORT || 3000

const app: Express = express()

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.static('./build'))

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(resolve('./build/index.html'), (error) => {
    if (error) {
      res.status(500).send(error)
    }
  })
})

const httpServer: Server = http.createServer(app)

const server = createServer(httpServer)

server.start().then(() => {
  server.applyMiddleware({
    app,
  })

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is listening on ${PORT}`)
  })
})
