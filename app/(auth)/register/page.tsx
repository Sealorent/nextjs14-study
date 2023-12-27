"use client"
import React, { useState } from 'react';
import Input from '@/app/components/CompleteInput';
import { HeadProvider, Title} from 'react-head';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        },10000)
    };

    const headTags = [
        <title key="title">Sign In</title>,
        <meta key="description" name="description" content="Sign In" />,
    ];

    return (
        <>
            <HeadProvider headTags={headTags} >
               <Title>Sign In </Title>
            </HeadProvider>

            <div className='flex flex-row bg-red-500 min-h-screen'>
                
                <div className='w-full  bg-green-200 md:flex justify-center items-center hidden'>

                </div>

                <div className='w-full bg-blue-50 flex flex-col justify-center items-center px-40'>
                    <Input
                        label={{ 
                            name: 'Email', 
                            forInput: 'email',
                            className: 'w-full '
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
                            className: 'w-full '
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

                </div>
            </div>
        </>
            
    );
};

export default Register;
