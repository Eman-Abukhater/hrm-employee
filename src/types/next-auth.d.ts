import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    role: string;
    id: string;
  }

  interface Session {
    user: {
      role: string;
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface JWT {
    role: string;
    id: string;
  }
}
