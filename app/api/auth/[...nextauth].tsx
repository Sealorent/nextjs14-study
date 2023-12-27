import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { signIn } from '@/app/lib/firebase/service';
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret : process.env.AUTH_SECRET,
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

            return session;
        },
    },
    pages : {
        signIn : '/auth/login'
    }
}

export default NextAuth(authOptions);