import { ApolloError } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {
  validatorRequired,
  validatorPhone,
  validatorEmail,
  validatorPassword,
} from '../../shared/validators'

interface SignupArgs {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

const signup = async (parent: any, args: SignupArgs) => {
  const { firstName, lastName, phone, email, password } = args

  try {
    // Perform validations.
    let error

    error = validatorRequired(firstName)
    if (error) {
      throw new ApolloError(error)
    }

    error = validatorRequired(lastName)
    if (error) {
      throw new ApolloError(error)
    }

    error = validatorPhone(phone)
    if (error) {
      throw new ApolloError(error)
    }

    error = validatorEmail(email)
    if (error) {
      throw new ApolloError(error)
    }

    error = validatorPassword(password)
    if (error) {
      throw new ApolloError(error)
    }

    const prisma = new PrismaClient()

    // Hash password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // Create a user record.
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hash,
      }
    })

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.TOKEN_SECRET || 'default_token_secret'
    )

    return {
      token,
    }
  } catch (error) {
    if ((error as ApolloError).code === 'P2002') {
      throw new ApolloError(`The "${(error as ApolloError).meta.target[0]}" field must be unique.`)
    }
    throw error
  }
}

const resolvers = {
  Query: {
    isLoggedIn: () => false,
  },
  Mutation: {
    signup,
  },
}

export default resolvers
