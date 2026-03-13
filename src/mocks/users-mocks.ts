import type { User } from "../types/User"

const usersMocks: User[] = [
  {
    name: "Lucas Campos",
    email: "lucas@teste.com",
    password:"lucas123",
    status: "Active",
    createdAt: "2026-01-10",
    lastActivity: "2026-01-20"
  },
  {
    name: "Pedro Henrique",
    email: "pedro@teste.com",
    status: "Pending",
    password:"pedro123",
    createdAt: "2026-01-12",
    lastActivity: "2026-01-21"
  },
  {
    name: "Thiago Cardoso",
    email: "thiago@teste.com",
    status: "Blocked",
    password:"thiago123",
    createdAt: "2026-06-15",
    lastActivity: "2026-06-22"
  },
  {
    name: "Felipe Antunes",
    email: "felipe@teste.com",
    status: "Active",
    password:"felipe123",
    createdAt: "2026-06-18",
    lastActivity: "2026-06-23"
  },
  {
    name: "Leonardo Augusto",
    email: "leonardo@teste.com",
    status: "Active",
    password:"leonardo123",
    createdAt: "2026-06-20",
    lastActivity: "2026-06-24"
  }
]

export { usersMocks }