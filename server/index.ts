import express, { Express } from 'express'
import http, { Server } from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import createServer from './graphql/createServer'
import reactRender from './reactRender'

const PORT: string|number = process.env.PORT || 3000

const app: Express = express()

app.use(cors({
  origin: '*',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.static('./build', {
  index: false,
}))

// Support React routing and SSR.
app.get('/*', reactRender)

const httpServer: Server = http.createServer(app)

// Create a Apollo server.
const server = createServer(httpServer)

server.start().then(() => {
  server.applyMiddleware({
    app,
  })

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is listening on ${PORT}`)
  })
})
