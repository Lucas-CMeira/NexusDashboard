
import { usersMocks } from "../mocks/users-mocks"
import type { User } from "../types/User"


interface LoginResponse {
    success: boolean
    user?: User
    error?: {
        message: string
    }
}

export default function useAuth() {

    function handleLogin(email: string, password: string): LoginResponse {

        const user = usersMocks.find(
            (mockedUser) => mockedUser.email === email
        )

        if (!user) {
            return {
                success: false,
                error: {
                    message: "Credenciais inválidas"
                }
            }
        }

        if (user.password !== password) {
            return {
                success: false,
                error: {
                    message: "Credenciais inválidas"
                }
            }
        }
        return {
            success: true,
            user
        }
    }
    return {
        handleLogin
    }



}
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
