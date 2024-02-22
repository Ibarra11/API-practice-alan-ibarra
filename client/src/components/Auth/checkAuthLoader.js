export async function checkAuth() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include",
  });
  if (res.ok) {
    return true;
  }
  return null;
}
