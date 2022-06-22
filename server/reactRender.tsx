import { Request, Response } from 'express'
import { resolve } from 'path'
import fs from 'fs'

import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { CookiesProvider, Cookies } from 'react-cookie'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

import { SchemaLink } from '@apollo/client/link/schema'
import { renderToStringWithData } from '@apollo/client/react/ssr'
import { makeExecutableSchema } from '@graphql-tools/schema'

import App from '../client/App'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

type CookieRequest = Request & {
  universalCookies: Cookies;
}

const reactRender = async (req: Request, res: Response) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema })
  })

  const app = await renderToStringWithData((
    <React.StrictMode>
      <ApolloProvider client={client}>
        <CookiesProvider cookies={(req as CookieRequest).universalCookies}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </CookiesProvider>
      </ApolloProvider>
    </React.StrictMode>
  ))

  const indexFile = resolve('./build/index.html')
  fs.readFile(indexFile, 'utf8', (error, data) => {
    if (error) {
      return res.status(500).send(error)
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    )
  })
}

export default reactRender
