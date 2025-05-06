import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            // Asegúrate de que el token se guarda correctamente
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token')
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token') || Cookies.get('token')
            if (!token) {
                setIsAuthenticated(false)
                setLoading(false)
                return
            }

            try {
                const res = await verifyTokenRequest(token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}