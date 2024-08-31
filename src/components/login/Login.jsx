import { useState } from "react";
import { loginUser } from "../../database/auth";
import { useAuth } from "../../context/AuthContext";

function Login({ toggle }) {
  const { isLoggedIn } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (status !== "submitting") {
        setStatus("submitting");
        const loginResult = await loginUser(loginFormData);

        if (loginResult) {
          throw new Error(loginResult.message);
        }
        toggle();
      }
    } catch (error) {
      setError(error);
    } finally {
      setStatus("idle");
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <section className="login">
      {" "}
      <button onClick={toggle} className="close--btn">
        X
      </button>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login--form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          autoComplete="on"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
          autoComplete="on"
        />
        <button disabled={status === "submitting"}>Log in</button>
        <p className="error">{error?.message}</p>
      </form>
    </section>
  );
}

export default Login;
