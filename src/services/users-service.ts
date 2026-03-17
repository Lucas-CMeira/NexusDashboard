//Serviçoes relacionados ao usuario
import { usersMocks } from "../mocks/users-mocks";

export function getUsers() {
  return Promise.resolve(usersMocks);
}