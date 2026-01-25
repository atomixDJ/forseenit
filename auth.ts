import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma as any),
    providers: [
        Google,
    ],
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            // After sign-in, route through /post-login for bootstrap
            // Exception: if callbackUrl is /onboarding, go there directly (Sign Up flow)

            const extractPath = (fullUrl: string) => {
                if (fullUrl.startsWith(baseUrl)) {
                    return fullUrl.replace(baseUrl, "") || "/";
                }
                if (fullUrl.startsWith("/")) {
                    return fullUrl;
                }
                return "/";
            };

            const path = extractPath(url);

            // Sign Up flow: go directly to onboarding (it handles its own bootstrap)
            if (path === "/onboarding" || path.startsWith("/onboarding?")) {
                return url.startsWith("/") ? `${baseUrl}${path}` : url;
            }

            // Standard login flow: route through /post-login
            if (path === "/" || path === "/login" || path.startsWith("/login?")) {
                return `${baseUrl}/post-login`;
            }

            // Preserve other callbackUrls through /post-login
            return `${baseUrl}/post-login?callbackUrl=${encodeURIComponent(path)}`;
        },
    },
    pages: {
        signIn: '/login',
    },
})
