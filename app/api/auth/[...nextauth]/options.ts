import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile.name || "",
              email: profile.email || "",
              image: profile?.picture || "",
              provider: "google",
              providerId: profile.sub,
            }),
          }
        );
        const user = await userResponse.json();
        return {
          id: user?.data?.id,
          name: user?.data?.name,
          email: user?.data?.email,
          image: user?.data?.image,
          role: user?.data?.role,
          status: user?.data?.status,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      async profile(profile) {
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile.name || "",
              email: profile.email || "",
              image: profile?.picture || "",
              provider: "facebook", // Fix: Changed provider to 'facebook'
              providerId: profile.id, // Fix: Corrected 'providerId'
            }),
          }
        );
        const user = await userResponse.json();
        return {
          id: user?.data?.id,
          name: user?.data?.name,
          email: user?.data?.email,
          image: user?.data?.image,
          role: user?.data?.role,
          status: user?.data?.status,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user?.data?.id,
            name: user?.data?.name,
            email: user?.data?.email,
            image: user?.data?.image,
            role: user?.data?.role,
            status: user?.data?.status,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "user";
        // token.accessToken = user?.access_token; // Removed as access_token does not exist on User type
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
  debug: process.env.NODE_ENV === "development",
};
