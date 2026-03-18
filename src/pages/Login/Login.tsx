import { useState, type SubmitEvent } from "react";
import useAuth from "../../hooks/useAuth";
import Popup from "../../components/Popup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  console.log(email);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = handleLogin(email, password);

    if (!response.success) {
      setPopupMessage(response.error?.message || "Erro ao fazer login");
      setShowPopup(true);
      return;
    }
  }

  return (
    <div>
      <Popup
        show={showPopup}
        title="Erro no login"
        description={popupMessage}
        variant="error"
      />

      <div className="flex justify-center items-center min-h-screen px-4 py-8 sm:px-6 sm:py-10">
        <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-2xl">
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
    </div>
  );
}

export default Login;
