export async function createCar(data) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return true;
  }
  return false;
}

export async function getCars() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`);
  if (!res.ok) {
    return { cars: [] };
  }
  const result = await res.json();
  return { cars: result.data };
}

export async function deleteCar(carId) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cars/${carId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return false;
  }
  return true;
}

export async function updateCar(carId, data) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cars/${carId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return false;
  return true;
}
