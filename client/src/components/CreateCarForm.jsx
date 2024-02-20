export async function action() {}

export default function CreateCarForm() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const make = formData.get("make");
    const model = formData.get("model");
    const year = formData.get("year");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
      method: "POST",
      body: JSON.stringify({
        make,
        model,
        year,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      window.location.reload();
      e.target.reset();
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
        Create Car
      </button>
    </form>
  );
}
