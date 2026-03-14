import { useState, type SubmitEvent } from "react";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin } = useAuth()

  console.log(email)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); 

    const response = handleLogin(email, password)
      
    if(!response.success){
      alert(response.error?.message)
      return
    }
  }

  return (
    <div className="w-full h-60 bg-amber-300 border-2 p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Login
        </h1>

        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block text-sm text-gray-600">Email</label>

            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Digite seu email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Senha</label>

            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Digite Sua Senha"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
