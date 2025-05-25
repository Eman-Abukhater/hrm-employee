// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@hrm.com' &&
          credentials?.password === 'admin123'
        ) {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@hrm.com',
            role: 'admin'
          };
        }
        if (
          credentials?.email === 'hr@hrm.com' &&
          credentials?.password === 'hr123'
        ) {
          return {
            id: '2',
            name: 'HR User',
            email: 'hr@hrm.com',
            role: 'hr'
          };
        }
        if (
          credentials?.email === 'employee@hrm.com' &&
          credentials?.password === 'emp123'
        ) {
          return {
            id: '3',
            name: 'Employee User',
            email: 'employee@hrm.com',
            role: 'employee'
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};
//  Only export handler functions, not authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
