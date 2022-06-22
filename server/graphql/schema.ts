import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type TokenResponse {
    token: String
  }

  type Account {
    firstName: String
    lastName: String
  }

  type Query {
    account: Account
  }

  type Mutation {
    signup(firstName: String, lastName: String, phone: String, email: String, password: String): TokenResponse
    login(email: String, password: String): TokenResponse
  }
`

export default typeDefs
