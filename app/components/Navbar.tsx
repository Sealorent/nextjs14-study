"use client"
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const Navbar = () => {
    const { theme, changeTheme } = useContext(ThemeContext);
    // console.log('Theme:', theme);
    useEffect(() => {
        console.log('Theme Updated:', theme);
    }, [theme]);
    return (
        <div>
            <ul
                className='flex justify-between items-center p-8'
            >
                <div>
                    <Link href="/">
                        <li>Home</li>
                    </Link>
                </div>
                <div
                    className='flex gap-5'
                >
                    <button 
                        className='btn'
                        onClick={() => {
                            changeTheme('light');
                        }}
                    >
                        Light
                    </button>
                    <button
                         className='btn btn-gray-900 text-white'
                         onClick={() => {
                            changeTheme('dark');
                        }}
                    >
                        Dark
                    </button>
                </div>

            </ul>
        </div>
    )

}

export default Navbar;