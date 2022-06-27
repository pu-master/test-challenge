import { ApolloError } from 'apollo-server-core'
import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../prismaClient'

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

const generateToken = (user: User) => (
  jwt.sign(
    {
      userId: user.id,
    },
    process.env.TOKEN_SECRET || 'default_token_secret'
  )
)

// Get information of a currently logged in user.
const getAccount = async (parent: any, args: any, context: any) => {
  if (!context.userId) {
    return null
  }

  try {
    const user: User|null = await prisma.user.findUnique({
      where: {
        id: context.userId,
      },
    })
    return user
  } catch (error) {
    //
  }
  return null
}

// Sign up a new user.
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

    // Hash password.
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // Create a user record.
    const user: User = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        password: hash,
      }
    })

    return {
      token: generateToken(user),
    }
  } catch (error) {
    if ((error as ApolloError).code === 'P2002') {
      throw new ApolloError(`The "${(error as ApolloError).meta.target[0]}" field must be unique.`)
    }
    throw error
  }
}

// Log in.
const login = async (parent: any, args: SignupArgs) => {
  const { email, password } = args

  const user: User|null = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new ApolloError('Invalid email or password.')
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApolloError('Invalid email or password.')
  }

  return {
    token: generateToken(user),
  }
}

const resolvers = {
  Query: {
    account: getAccount,
  },
  Mutation: {
    signup,
    login,
  },
}

export default resolvers
