import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { signIn } from '@/app/lib/firebase/service';
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret : 'hallo',
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const user : any  = await signIn(email)
                if (user) {
                    const passwordMatch = await compare(password, user.password);
                    if (passwordMatch) {
                        return user;
                    } 
                    return null;
                } else {
                    return null;
                }

            },
        }),
    ],
    callbacks : {
        async jwt({token, account, profile, user} : any){
            if(account?.provider === "credentials"){
                console.log("JWT", [token, account, profile, user]);
                token.email = user.email;
                token.fullname = user.fullname;
                token.phone = user.phone;
                token.role = user.role;
            }

            return token;
        },

        async session({session, token} : any){
            if("email" in token){
                session.user.email = token.email;
            }
            if("fullname" in token){
                session.user.fullname = token.fullname;
            }
            if("phone" in token){
                session.user.phone = token.phone;
            }
            if("role" in token){
                session.user.role = token.role;
            }
            console.log("SESSION", [session, token]);
            return session;
        },
    },
    pages : {
        signIn : '/sign-in',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET , handler as POST};