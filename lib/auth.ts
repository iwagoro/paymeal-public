import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as Auth } from "@/lib/firebase";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
    pages: {
        signIn: "/auth",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(Auth, (credentials as any).email || "", (credentials as any).password || "")
                    .then(async (userCredential) => {
                        if (userCredential.user) {
                            const idToken = await userCredential.user.getIdToken();
                            return {
                                id: userCredential.user.uid,
                                name: userCredential.user.displayName,
                                email: userCredential.user.email,
                                idToken, // 修正: idTokenとして返す
                            };
                        }
                        return null;
                    })
                    .catch((error) => {
                        console.error("Authentication error: ", error);
                        return null;
                    });
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.idToken = user.idToken; // 修正: idTokenとして保存
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.idToken = token.idToken as string; // 修正: idTokenをセッションに保存
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

declare module "next-auth" {
    interface Session {
        idToken: string;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
