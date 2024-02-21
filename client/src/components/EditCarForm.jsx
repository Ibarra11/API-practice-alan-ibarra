import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "react-feather";
import { updateCar } from "../api/cars";
import { useRevalidator } from "react-router-dom";

export default function EditCarForm({ id, make, model, year, onClose }) {
  const revalidator = useRevalidator();
  const [isSaving, setIsSaving] = React.useState(false);
  async function handleEditSubmit(e) {
    setIsSaving(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const make = formData.get("make");
    const model = formData.get("model");
    const year = formData.get("year");
    try {
      const res = await updateCar(id, { make, model, year });
      if (!res) {
        throw new Error();
      }
      onClose();
      revalidator.revalidate();
    } catch (e) {
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <Dialog.Root onOpenChange={() => (isSaving ? null : onClose)} defaultOpen>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur" />
        <Dialog.Content
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            if (isSaving) return;

            onClose();
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault();
            if (isSaving) return;
            onClose();
          }}
          className="fixed inset-0 m-auto w-96 h-fit py-6 px-4 bg-white rounded-md"
        >
          <Dialog.Title className=" text-lg font-bold text-gray-900 mb-4">
            Edit car
          </Dialog.Title>
          <form className="space-y-6" onSubmit={handleEditSubmit}>
            <Dialog.Close asChild disabled={isSaving}>
              <button className="absolute top-6 right-4 p-1">
                <X size={16} />
              </button>
            </Dialog.Close>
            <div className="space-y-4">
              <fieldset className="flex flex-col gap-1">
                <label
                  className=" font-semibold text-base text-gray-700 "
                  htmlFor="make"
                >
                  Make
                </label>
                <input
                  name="make"
                  className="block px-1 h-8 bg-gray-200 shadow-inner rounded"
                  id="make"
                  required
                  defaultValue={make}
                />
              </fieldset>
              <fieldset className="flex flex-col gap-1">
                <label
                  className=" font-semibold text-base text-gray-700 "
                  htmlFor="model"
                >
                  Model
                </label>
                <input
                  className="block px-1 h-8 bg-gray-200 shadow-inner rounded"
                  id="model"
                  name="model"
                  required
                  defaultValue={model}
                />
              </fieldset>

              <fieldset className="flex flex-col gap-1">
                <label
                  className=" font-semibold text-base text-gray-700 "
                  htmlFor="year"
                >
                  Year
                </label>
                <input
                  className="block px-1 h-8 bg-gray-200 shadow-inner rounded"
                  required
                  name="year"
                  id="year"
                  type="number"
                  placeholder="YYYY"
                  min="1990"
                  max="2024"
                  defaultValue={year}
                />
              </fieldset>
            </div>

            <div className="flex justify-end">
              <button
                disabled={isSaving}
                className=" bg-green-200 text-green-900 p-2 rounded hover:bg-green-300 "
              >
                {isSaving ? "Saving Changes" : "Save Changes"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
