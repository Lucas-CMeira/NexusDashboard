import { useNavigate } from "react-router-dom"
import { usersMocks } from "../mocks/users-mocks"
import { useContext } from "react"
import { UserContext } from "../context/user-context"
import { initializeUserBalance } from "../services/balance-service"


interface LoginResponse {
    success: boolean
    error?: {
        message: string
    }
}


export default function useAuth() {

    const navigate = useNavigate()
    const {setUser, logout: contextLogout} = useContext(UserContext)

    function handleLogin(email: string, password: string): LoginResponse {



        const user = usersMocks.find(
            (mockedUser) => mockedUser.email === email
        )

        if (!user || user.password !== password) {
            return {
                success: false,
                error: {
                    message: "Credenciais invalidas"
                }
            }
        }

        setUser(user)
        
        initializeUserBalance(user.email)

        navigate("/")

        return {
            success: true
        }

    }

    function logout() {
        contextLogout()
        navigate("/login")
    }


    return {
        handleLogin,
        logout
    }
}


