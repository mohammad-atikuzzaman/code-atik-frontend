import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios("http://localhost:3000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUsers(res?.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handlePromote = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/promote/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error promoting user");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div className="bg-purple-400 p-6">
        {users.map((user) => (
          <div className="bg-gray-300 p-4 rounded-md m-4" key={user?._id}>
            <h2>{user?.role}</h2>
            <p>{user?.email}</p>
          </div>
        ))}
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User email"
      />
      <button onClick={handlePromote}>Promote to Admin</button>
    </div>
  );
};

export default AdminPanel;
