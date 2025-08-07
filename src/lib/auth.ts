import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      username?: string
      role: string
      avatar?: string
    }
  }
  
  interface User {
    id: string
    email: string
    name: string
    username?: string
    role: string
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    username?: string
    avatar?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Auth attempt with credentials:', { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password 
        })

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { username: credentials.email }
            ]
          }
        })

        console.log('User found:', user ? { id: user.id, email: user.email, username: user.username } : 'No user found')

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        console.log('Password valid:', isPasswordValid)

        if (!isPasswordValid) {
          return null
        }

        const returnUser = {
          id: user.id.toString(),
          email: user.email,
          name: user.name || user.username,
          username: user.username,
          role: user.role,
          avatar: user.avatar
        }

        console.log('Returning user:', returnUser)
        return returnUser
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.username = user.username
        token.avatar = user.avatar
      }
      
      // Always fetch fresh user data from database
      if (token.id) {
        const freshUser = await prisma.user.findUnique({
          where: { id: parseInt(token.id) },
          select: { avatar: true, name: true, username: true, email: true, role: true }
        })
        
        if (freshUser) {
          token.avatar = freshUser.avatar
          token.name = freshUser.name || freshUser.username
          token.username = freshUser.username
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.username = token.username
        session.user.avatar = token.avatar
        session.user.name = token.name as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
}









