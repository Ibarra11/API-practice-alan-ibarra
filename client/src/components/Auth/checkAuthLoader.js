export async function checkAuth() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`);
  if (res.ok) {
    return true;
  }
  return null;
}
