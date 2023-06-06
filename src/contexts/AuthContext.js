import { useEffect, useState, createContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        //Comprobar si el usuario está logueado o no
    }, []);

    const login = async (accessToken) => {
        console.log("Login context");
        console.log(accessToken);
    };

    const data = {
        accessToken: token,
        user,
        login
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}