"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/app/components/CompleteInput';
import { HeadProvider, Title } from 'react-head';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { push, set } from 'firebase/database';

const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const name = process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res : any = await signIn("credentials", {
                redirect : false,
                email : email,
                password : password,
                callbackUrl : '/register'
            })
            if(res.error){
                setError(res.error);
                setLoading(false);
            }else{
                router.push('/register');
            }
        }catch(error){
            console.log(error)
            setError('Email already exist');
        }

        
    };

    const headTags = [
        <title key="title">Sign In</title>,
        <meta key="description" name="description" content="Sign In" />,
    ];

    return (
        <>
            <HeadProvider headTags={headTags}>
                <Title>Sign In</Title>
            </HeadProvider>

            <div className='flex flex-row bg-red-500 min-h-screen'>
                {/* column 1 */}
                <div className='w-full  bg-green-200  justify-center items-center hidden  md:flex  md:flex-col'>
                    <h1>
                        {name}
                    </h1>
                    <Image
                        src="/assets/auth/ils1.svg"
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className=' w-20'
                        priority
                    />
                </div>
                {/* column 2 */}
                <div className='w-full bg-blue-50 flex flex-col justify-center items-center'>
                    <div className='w-full px-10 justify-center items-center '>
                        {/* header */}
                        <div className='text-center flex flex-col gap-2'>
                            <h2 className='font-semibold'>
                                Sign In
                            </h2>
                            <div className="text-slate-500 dark:text-slate-400 text-base ">
                                Sign in to your account to start using Dashcode
                            </div>

                        </div>
                        {/* form */}
                        <form action="">
                            <Input
                                label={{ 
                                    name: 'Email', 
                                    forInput: 'email',
                                    className: 'w-full ',
                                }}
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e)}
                            />
                            <Input
                                label={{ 
                                    name: 'Password', 
                                    forInput: 'password',
                                    className: 'w-full ',
                                }}
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e)}
                            />
                            <button className='btn btn-block btn-primary' onClick={handleSubmit}>
                                {loading && <span className='loading loading-spinner'></span>}
                                Sign In
                            </button>
                            {error && 
                                <div className='text-red-500 text-center bg-red-100 mt-5 py-2'>{error}</div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default SignIn;
