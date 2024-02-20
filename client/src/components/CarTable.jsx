import React from "react";
import { useLoaderData } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const defaultData = [
  {
    make: "Honda",
    model: "Civic",
    year: "1999",
  },
  {
    make: "WHat",
    model: "Civic",
    year: "2000",
  },
  {
    make: "Honda",
    model: "Civic",
    year: "2001",
  },
];

const columnHelper = createColumnHelper();

const columns = [
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
  const cars = useLoaderData();
  const table = useReactTable({
    data: cars,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="border-b bg-gray-800 border-gray-700" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="px-6 py-3" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
