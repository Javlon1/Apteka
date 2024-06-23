import { createContext, useEffect, useState } from 'react'
const Context = createContext()

function Provider({ children }) {
    const [url] = useState("https://apteka-ut54.onrender.com")
    const [order, setOrder] = useState([])
    const [error, setError] = useState(false)

    const [checkNumber, setCheckNumber] = useState(() => {
        const storedCheckNumber = typeof window !== 'undefined' ? window.localStorage.getItem('checkNumber') : null;
        return storedCheckNumber ? storedCheckNumber : 1;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('checkNumber', checkNumber);
        }
    }, [checkNumber]);


    const [auth_token, setAuth_token] = useState(() => {
        const storedauth_token = typeof window !== 'undefined' ? window.localStorage.getItem('auth_token') : null;
        return storedauth_token ? storedauth_token : 1;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('auth_token', auth_token);
        }
    }, [auth_token]);

    
    return (
        <Context.Provider value={{ url, checkNumber, setCheckNumber, order, setOrder, error, setError, auth_token, setAuth_token }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }