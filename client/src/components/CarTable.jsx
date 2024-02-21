import React from "react";
import { useLoaderData } from "react-router-dom";
import { Trash, Edit } from "react-feather";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteCar } from "../api/cars";
import EditCarForm from "./EditCarForm";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => "ID",
  }),
  columnHelper.accessor("make", {
    cell: (info) => info.getValue(),
    header: () => "Make",
  }),
  columnHelper.accessor("model", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => "Model",
  }),
  columnHelper.accessor("year", {
    header: () => "Year",
    cell: (info) => info.renderValue(),
  }),

  columnHelper.accessor("date_created", {
    header: () => "Date Created",
    cell: (info) => new Date(info.renderValue()).toLocaleDateString("en-US"),
  }),
];

export default function CarTable() {
  const [editingCar, setEditingCar] = React.useState(null);
  const cars = useLoaderData();
  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleDeleteCar(carId) {
    const result = await deleteCar(carId);
    if (result) {
      window.location.reload();
    }
  }

  return (
    <>
      {editingCar !== null && (
        <EditCarForm
          onClose={() => setEditingCar(null)}
          id={editingCar.id}
          make={editingCar.make}
          model={editingCar.model}
          year={editingCar.year}
        />
      )}
      <table className="max-w-4xl w-full text-gray-300 text-left rounded-md overflow-hidden">
        <thead className="text-xs text-gray-50 uppercase bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-6 py-3" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="px-6 py-3" key={`${headerGroup.id}-actions`}>
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const { id, make, model, year } = row.original;
            return (
              <tr
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 transition-colors"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="px-6 py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-6 py-3" key={`${row}-actions`}>
                  <div className="flex gap-2 text-gray-300">
                    <button
                      onClick={() => handleDeleteCar(id)}
                      className="hover:text-gray-50 transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                    <button
                      onClick={() => setEditingCar({ id, make, model, year })}
                      className="hover:text-gray-50 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
