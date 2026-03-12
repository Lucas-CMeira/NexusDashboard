import {createBrowserRouter} from "react-router-dom";
import React from 'react'
import Login from '../pages/Login/Login'
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";


const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },

  {
    path: "/Home",
    element: <Home/>
  },

  {
    path: "/Users",
    element: <Users/>
  },
])

// Criar pastas 'page' para o restante das paginas 'withdrawal' e 'converstion'
// Na pasta service, um arquivo para cada pagina, ex: 'withdrawal-services.ts', 'deposit-service.ts'
// usar o outlet -> aninhar rotas para usar tela template

// tsx sempre deve ser uma função que retorna linguagem de marcaçao, tipo html. Ts contem so logica

export default routes