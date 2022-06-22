import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { ApolloProvider } from '@apollo/client'

import createApolloClient from './createApolloClient'
import App from './App'
import './styles/app.scss'

// Instantiate an Apollo client.
const client = createApolloClient()

// Mount a React app.
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </ApolloProvider>
    </React.StrictMode>
  )
)
