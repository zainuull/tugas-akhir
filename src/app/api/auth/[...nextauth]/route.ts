import prisma from '@/lib/prismadb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: 'zainul123',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'mail', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findFirst({ where: { email } });
        const confirmPassword = await bcrypt.compare(password, user?.password || '');
        if (confirmPassword) {
          return user;
        } else {
          throw new Error('Invalid Password');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider == 'credentials') {
        token.id = user?.id;
        token.name = user?.name;
        token.email = user?.email;
        token.role = user?.role;
        token.imageUrl = user.imageUrl;
      }
      console.log('user 2', token);
      return token;
    },
    async session({ session, token }: any) {
      if ('id' in token) {
        session.user.id = token.id;
      }
      if ('name' in token) {
        session.user.name = token.name;
      }
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('imageUrl' in token) {
        session.user.imageUrl = token.imageUrl;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      console.log('user 3', session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
