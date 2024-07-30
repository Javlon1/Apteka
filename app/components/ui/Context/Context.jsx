import { createContext, useEffect, useState } from 'react'
const Context = createContext()

function Provider({ children }) {
    const [url] = useState("https://a081870889502de05c7a82a5d155385b.serveo.net")
    const [order, setOrder] = useState([])
    const [type, setType] = useState('')
    const [error, setError] = useState(false)
    const [sale, setSale] = useState(false)


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
        <Context.Provider value={{ url, checkNumber, setCheckNumber, order, setOrder, error, setError, auth_token, setAuth_token, sale, setSale, type, setType }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }