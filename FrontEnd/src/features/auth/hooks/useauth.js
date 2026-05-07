import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout , getme} from "../services/auth.api";


export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user , setUser , loading , setLoading } = context


    const handleLogin  = async ({email, password }) => {
        setLoading (true)
        try {
            const data = await login ({ email , password })
            setUser(data.user)
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }

    const handelRegister = async ({username, email, password, confirmpassword }) => {
        setLoading (true)
        try{
        const data = await register ({ username, email, password, confirmpassword })
        setUser(data.user)
        } catch (err) {

        } finally {
        setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading (true)
        try {
        const data = await logout ()
        setUser(null)
        }catch (err) {

        } finally{
        setLoading(false)
        }
    }

    useEffect(() => {

        const getandSetUser = async() => {
            const data = await getme()
            setUser(data.user)
            setLoading(false)
        }

        getandSetUser()
    },[])


    
    return  { user, loading , handelRegister, handleLogin, handleLogout }
}