import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Usuários", path: "/users" },
    { name: "Depósitos", path: "/deposit" },
    { name: "Saques", path: "/withdraw" },
    { name: "Conversão", path: "/conversion" },
  ];

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">Dashboard</div>
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
