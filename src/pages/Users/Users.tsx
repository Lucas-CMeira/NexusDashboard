import { useState } from "react";
import { usersMocks } from "../../mocks/users-mocks";

function Users() {
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const filteredByName = usersMocks.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  const filteredUsers = filteredByName.filter((user) => {
    if (!searchDate) return true;

    return user.createdAt.includes(searchDate);
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Usuários Ativos</h1>

        {/* filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchName}  
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded w-56"
          />

          <input
            type="text"
            placeholder="Buscar por data (DD/MM/AAAA)"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded w-56"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-3">Nome</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Criado em</th>
                <th className="p-3">Última atividade</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.email}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full
                        ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-600">{user.createdAt}</td>
                  <td className="p-3 text-gray-600">{user.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
