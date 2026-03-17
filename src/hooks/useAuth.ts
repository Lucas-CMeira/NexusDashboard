
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
        
        // Inicializa o saldo do usuário se não existir
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





/*
           -> handle login é resposável pelo fluxo COMPLETO de autenticação. Validar email e senha é só uma parte do
           fluxo.
           Para completar o fluxo de autenticação de maneira ideal, esse método ainda precisa:
           -> Salvar o usuario logado no estado global da aplicação
           -> Redirecionar o usuario para tela home

           Portanto, se o fluxo der certo, esse método não precisa ter return. Ele nao precisa retornar nada
           para o login-page.

           Esse método só retorna alguma coisa se o fluxo der errado (credenciais invalidas por exemplo).
           Nesse caso, quando dá erro, a gente precisa retornar um objeto com erro para o login-page
           tratar o erro (tratar o erro é mostrar uma mensagem com os detalhes do erro para o usuario entender o q aconteceu)

       */
// buscar usuario com email informado no arquivo de mock
// se nao existir lanca erro "Credenciais invalidas"
// se existir, conferir se a senha bate
// se nao bater lanca erro "Credenciais invalidas"

/*

    criar interface para tipar o retorno

    interface LoginResponse {
        success: boolean,
        user?: User;
        error?: { message: string }
    }

    no fim do fluxo, se o usuario for autenticado retorna

    return {
        success: true,
        user
    }

    se der erro retorna 

    return {
        success: false,
        error: {
            message: "credenciais invalidas"
            ...
        }
    }

*/
