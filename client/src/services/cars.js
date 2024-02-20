export async function getCars() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`);
  if (!res.ok) {
    return { cars: [] };
  }
  const result = await res.json();
  return { cars: result.data };
}
