"use client"
import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext({
  theme: 'light',
  changeTheme: (theme: string) => {},
})

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    setMounted(true);
  }, []);

  if (!mounted) {
    // return <>Loading...</>;
    console.log('Loading...');
  }

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    
    // Log the updated theme directly in the changeTheme function
    console.log('Theme Updated:', newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}