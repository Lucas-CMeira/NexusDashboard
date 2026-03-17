import type { User } from "../types/User"

const usersMocks: User[] = [
  {
    name: "Lucas Campos",
    email: "lucas@teste.com",
    password: "lucas123",
    status: "Active",
    createdAt: "10/01/2026",
    lastActivity: "20/01/2026"
  },
  {
    name: "Pedro Henrique",
    email: "pedro@teste.com",
    password: "pedro123",
    status: "Pending",
    createdAt: "12/01/2026",
    lastActivity: "21/01/2026"
  },
  {
    name: "Thiago Cardoso",
    email: "thiago@teste.com",
    password: "thiago123",
    status: "Blocked",
    createdAt: "15/06/2026",
    lastActivity: "22/06/2026"
  },
  {
    name: "Felipe Antunes",
    email: "felipe@teste.com",
    password: "felipe123",
    status: "Active",
    createdAt: "18/06/2026",
    lastActivity: "23/06/2026"
  },
  {
    name: "Leonardo Augusto",
    email: "leonardo@teste.com",
    password: "leonardo123",
    status: "Active",
    createdAt: "20/06/2026",
    lastActivity: "24/06/2026"
  },
  {
    name: "Marcos Vinicius",
    email: "marcos@teste.com",
    password: "marcos123",
    status: "Active",
    createdAt: "05/02/2026",
    lastActivity: "18/02/2026"
  },
  {
    name: "Bruno Almeida",
    email: "bruno@teste.com",
    password: "bruno123",
    status: "Pending",
    createdAt: "11/03/2026",
    lastActivity: "19/03/2026"
  },
  {
    name: "Rafael Costa",
    email: "rafael@teste.com",
    password: "rafael123",
    status: "Active",
    createdAt: "22/04/2026",
    lastActivity: "02/05/2026"
  },
  {
    name: "Gabriel Martins",
    email: "gabriel@teste.com",
    password: "gabriel123",
    status: "Blocked",
    createdAt: "14/05/2026",
    lastActivity: "28/05/2026"
  },
  {
    name: "Eduardo Santos",
    email: "eduardo@teste.com",
    password: "eduardo123",
    status: "Active",
    createdAt: "07/07/2026",
    lastActivity: "15/07/2026"
  },
]


// Colocar barra de pesquisa(por nome)
// Pesquisar por data de criação
// Paginação
// Ordem alfabetica

export { usersMocks }