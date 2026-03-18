import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user-context";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Usuários", path: "/Users" },
    { name: "Depósitos", path: "/Deposit" },
    { name: "Saques", path: "/Withdraw" },
    { name: "Conversão", path: "/Conversion" },
  ];

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="w-full bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Dashboard Nexus
        </div>
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition duration-200 px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Bem-vindo, {user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 transition duration-200 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
