import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import Loading from "@/components/admin-panel/Loading";
import { User } from "lucide-react";
import { fetchUsers } from "@/features/users/userSlice";

const Users = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const [selectedUser, setSelectedUser] = useState<{
    email: string;
    currentRole: string;
  } | null>(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [token, dispatch]);

  const handleRoleChange = (user: { email: string; role: string }) => {
    setSelectedUser({
      email: user.email,
      currentRole: user.role,
    });
    setNewRole(user.role === "admin" ? "user" : "admin");
  };

  const handlePromote = async () => {
    if (!selectedUser || !newRole) return;

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/change-role`,
        { email: selectedUser.email, role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(
        users.map((user) =>
          user.email === selectedUser.email ? { ...user, role: newRole } : user
        )
      );

      setSuccessMessage(res.data.message);
      setSelectedUser(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error changing user role. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700/50">
        <User className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
        <h3 className="text-xl font-medium text-gray-300">No user yet</h3>
        <p className="mt-2 text-gray-500">
          Registered user of website will appear here
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br ">
        <div className="max-w-7xl mx-auto bg-slate-800 bg-opacity-70 rounded-xl p-4 sm:p-6 backdrop-blur-sm text-pink-200 text-sm sm:text-base">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          User Management
        </h2>

        {successMessage && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-purple-800 bg-opacity-50 border border-purple-400 rounded-lg text-purple-100 text-sm sm:text-base">
            {successMessage}
          </div>
        )}

        <div className="bg-slate-800 bg-opacity-70 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-900">
              <thead className="bg-gradient-to-r from-purple-400 to-purple-900">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-purple-200 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-purple-200 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-purple-200 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 bg-opacity-50 divide-y divide-purple-900">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-700 hover:bg-opacity-50 transition-colors"
                  >
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-purple-100 truncate max-w-[100px] sm:max-w-[200px] md:max-w-none">
                      {user.email}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-pink-100 capitalize">
                      {user.role}
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">
                      <button
                        onClick={() => handleRoleChange(user)}
                        className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-md font-medium transition-all text-xs sm:text-sm ${
                          user.role === "admin"
                            ? "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-700 text-white"
                            : "bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-600 text-white"
                        }`}
                        disabled={loading}
                      >
                        {user.role === "admin" ? "Demote" : "Promote"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Change Confirmation Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-slate-800 to-purple-900 p-4 sm:p-6 rounded-xl shadow-2xl border border-purple-700 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                Confirm Role Change
              </h3>
              <p className="mb-3 sm:mb-4 text-purple-100 text-sm sm:text-base">
                Change role for{" "}
                <span className="font-semibold text-pink-200">
                  {selectedUser.email}
                </span>{" "}
                from{" "}
                <span className="capitalize text-purple-300">
                  {selectedUser.currentRole}
                </span>{" "}
                to <span className="capitalize text-pink-300">{newRole}</span>?
              </p>
              <div className="flex justify-end space-x-2 sm:space-x-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 border border-purple-600 text-purple-200 rounded-lg hover:bg-purple-900 transition-colors text-xs sm:text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePromote}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all text-xs sm:text-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing
                    </span>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
