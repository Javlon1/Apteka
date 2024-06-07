import { createContext, useEffect, useState } from 'react'
const Context = createContext()

function Provider({ children }) {
    const [url] = useState("http://localhost:3000/api")
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

    return (
        <Context.Provider value={{ url, checkNumber, setCheckNumber, order, setOrder, error, setError }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }