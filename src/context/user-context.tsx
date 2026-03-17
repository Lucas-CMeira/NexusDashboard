/*

    estados "sao variaveis", mas sao variaveis com algumas vantagens e funcionalidades a mais.

    Assim como no c++ a gente definia uma variavel, no react a gente pode definir estados.
    É quase como uma variavel comum, entao a gente pode atribuir/modificar valores, usar em lógicas... 

    a definição de estados é feito usando o useState -> um hook nativo do react
    é o famoso:
    const [email, setEmail] = useState() --> aqui, o useState retorna um array de métodos:

    email -> quando a gente quer acessar o valor do estado
    setEmail -> quando a gente quer modificar o valor do estado


    A grande diferença, é que um estado é gerenciado pelo react, toda vez que o valor da varivel muda o react
    re-renderiza o componente. Isso é chamado de reatividade.

    exemplo de reatividade: 
    um bom exemplo de reatividade é os efeitos colaterais que o onChange do input seta um valor 
    para o estado. 
    Lembra quando a gente tava testando o formulario de login, quando digitava alguma coisa no input aparecia 
    um log no console com o valor atual do campo input? Isso é reatividade. 

    onChange() -> modifica o valor do estado "email" com setEmail(e.target.value) -> react observa 
    a mudança de valor do estado -> re-renderiza o componente (componente seria a página) com o valor atual 
    do estado -> console.log(email) reflete o valor atual do estado


    Isso é um estado. Essa é a vantagem do estado, ele proporciona reatividade (react), nos permite criar 
    interfaces intuitivas que proporcionam boas experiencias para o usuario (usuario final nao tem que ficar 
    dando f5 toda vez, a reatividade cuida disso sem precisar atualziar a página)



    {
        name: "Leonardo Augusto",
        email: "leonardo@teste.com",
        status: "Active",
        password:"leonardo123",
        createdAt: "2026-06-20",
        lastActivity: "2026-06-24"
    }
*/

import {
  createContext,
  useState,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { User } from "../types/User";

interface UserContextItens {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextItens>({
  setUser: () => {},
  user: null,
  logout: () => {},
  isAuthenticated: false,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Carrega usuário sincronamente na inicialização
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // Salva usuário no localStorage quando mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
