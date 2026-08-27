// auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        // Fixed Admin Account
        if (
          email === "admin@careerhub.com" &&
          password === "Admin@123"
        ) {
          return {
            id: "admin-1",
            name: "CareerHub Admin",
            email: "admin@careerhub.com",
            role: "admin",
          };
        }

        // Temporary User Account
        if (
          email === "user@careerhub.com" &&
          password === "User@123"
        ) {
          return {
            id: "user-1",
            name: "CareerHub User",
            email: "user@careerhub.com",
            role: "user",
          };
        }

        // Invalid credentials
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});