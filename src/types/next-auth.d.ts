
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
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
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
    id: string;
  }
}
