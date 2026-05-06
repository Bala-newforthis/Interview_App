import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getme } from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user , setUser , loading , setLoading } = context


    const handleLogin  = async ({email, password }) => {
        setLoading (true)
    const data = await login ({ email , password })
    setUser(data.user)
    setLoading(false)
    }

    const handelRegister = async ({username, email, password, confirmpassword }) => {
        setLoading (true)
        const data = await register ({ username, email, password, confirmpassword })
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading (true)
        const data = await logout ()
        setUser(null)
        setLoading(false)
    }

    
    return  { user, loading , handelRegister, handleLogin, handleLogout }
}