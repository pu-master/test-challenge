import { Request } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { Server } from 'http'
import jwt from 'jsonwebtoken'

import typeDefs from './schema'
import resolvers from './resolvers'

interface ContextParams {
  req: Request
}

const createServer = (httpServer: Server) => (
  new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }: ContextParams) => {
      if (req.cookies && req.cookies.token) {
        try {
          const decoded = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET || 'default_token_secret')
          if ((decoded as any).userId) {
            return {
              userId: (decoded as any).userId,
            }
          }
        } catch (error) {
          //
        }
      }
      return {}
    }
  })
)

export default createServer
