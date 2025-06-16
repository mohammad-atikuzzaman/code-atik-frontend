import { useState } from "react";
import { loginUser } from "../features/auth/authAPI";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      dispatch(
        setCredentials({
          token: data.token,
          email: data.user.email,
          role: data.user.role,
        })
      );
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={googleLogin}>Continue with Google</button>
      <p>
        Don't have account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
