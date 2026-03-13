import { usersMocks} from "../../mocks/users-mocks"

function Users() {

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Users
        </h1>

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

              {usersMocks.map((user) => (
                <tr
                  key={user.email}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
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

      </div>

    </div>
  )
}

export default Users