import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useAuthContext } from "./AuthProvider";
export default function Login() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (!res.ok) {
    } else {
      const data = await res.json();
      setAuth({ accessToken: data.jwt });
      navigate("/");
      e.target.reset();
    }
  }
  return (
    <AuthForm
      title={"Welcome Back"}
      buttonText={"Log In"}
      handleSubmit={handleSubmit}
    >
      <Link
        className="block underline-offset-2 underline  text-center"
        to="/auth/register"
      >
        Create an account
      </Link>
    </AuthForm>
  );
}
