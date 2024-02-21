import { useRevalidator } from "react-router-dom";
import { createCar } from "../api/cars";
import React from "react";

export default function CreateCarForm() {
  const [isCreating, setIsCreating] = React.useState(false);
  const revalidator = useRevalidator();
  async function handleSubmit(e) {
    if (isCreating) return;
    setIsCreating(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const make = formData.get("make");
    const model = formData.get("model");
    const year = formData.get("year");
    try {
      const car = await createCar({ make, model, year });
      if (!car) {
        throw new Error();
      }
      e.target.reset();
      revalidator.revalidate();
    } catch (e) {
    } finally {
      setIsCreating(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            className="text-base text-gray-700 font-semibold"
            htmlFor="make"
          >
            Make:
          </label>
          <input
            className="h-10 rounded text-base px-1"
            required
            name="make"
            id="make"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-base text-gray-700 font-semibold"
            htmlFor="model"
          >
            Model:
          </label>
          <input
            className="h-10 rounded text-base px-1"
            required
            name="model"
            id="model"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-base text-gray-700 font-semibold"
            htmlFor="year"
          >
            Year:
          </label>
          <input
            className="h-10 rounded text-base px-1"
            required
            name="year"
            id="year"
            type="number"
            placeholder="YYYY"
            min="1990"
            max="2024"
          />
        </div>
      </div>
      <button className="bg-gray-700 text-gray-50 h-12 w-full rounded">
        {isCreating ? "Create Car" : "Creating Car"}
      </button>
    </form>
  );
}
