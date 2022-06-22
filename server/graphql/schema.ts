import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type Account {
    token: String
  }

  type Query {
    isLoggedIn: Boolean
  }

  type Mutation {
    signup(firstName: String, lastName: String, phone: String, email: String, password: String): Account
  }
`

export default typeDefs
