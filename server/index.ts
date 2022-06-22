import express, { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { gql, ApolloServerPluginDrainHttpServer, ApolloError } from 'apollo-server-core'
import http, { Server } from 'http'
import { PrismaClient } from '@prisma/client'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const PORT: string|number = process.env.PORT || 3000

const app: Express = express()

app.use(express.static('./build'))

const httpServer: Server = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

server.start().then(() => {
  server.applyMiddleware({
    app,
  })

  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is listening on ${PORT}`)
  })
})
