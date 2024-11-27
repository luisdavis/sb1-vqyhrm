import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@/services/auth.service';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-fallback-secret-key-for-development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const result = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (result.error) {
            throw new Error(result.error.message || 'Authentication failed');
          }

          if (!result.data) {
            throw new Error('No data received from authentication service');
          }

          return {
            id: result.data.email,
            email: result.data.email,
            accessToken: result.data.access,
            refreshToken: result.data.refresh,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Authentication failed';
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};