import { redirect } from "react-router-dom";

export async function checkAuth() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin":
        "https://api-practice-alan-ibarra.vercel.app",
    },
  });
  if (res.ok) {
    return true;
  }
  return null;
}
