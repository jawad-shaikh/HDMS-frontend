import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Icons } from "../global/icons";

const Table = ({ data, columns }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<any>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter: search,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearch,
  });
  return (
    <>
      <div className="inline-flex w-[300px] items-center border-2 border-gray p-2 gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="block w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {
        data ? <><table className="w-full overflow-auto border border-gray">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-sm font-semibold bg-primary"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-white text-left p-4">
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex min-w-[36px]"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.id === "action" ||
                          header.column.id === "status"
                          ? null
                          : {
                            asc: <span className="pl-2">↑</span>,
                            desc: <span className="pl-2">↓</span>,
                          }[header.column.getIsSorted() as string] ?? (
                            <span className="pl-2 flex items-center">
                              <Icons.arrows />
                            </span>
                          )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-sm p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>



        </table>
          <div className="flex items-center justify-end my-4 gap-2">
            <p className="text-[#9E9E9E]">Show data per page</p>
            <select
              className="block border-2 border-gray !bg-white p-2 pr-8 outline-none"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>

            <button
              className="disabled:text-[#9E9E9E] flex items-center justify-center h-[44px] min-w-[44px] hover:bg-primary hover:text-white px-4"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none" className="mr-2">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>
            {
              [...Array(Math.min(table.getPageCount() - 1, Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) + 4 - 1) - Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) + 1)].map((_, index) => {
                const pageNumber = Math.max(0, table.getState().pagination.pageIndex - Math.floor(4 / 2)) + index;
                return (
                  <button
                    key={index}
                    className={`text-[#9E9E9E] flex items-center justify-center h-[44px] min-w-[44px] hover:bg-primary hover:text-white ${table.getState().pagination.pageIndex === pageNumber ? 'bg-primary text-white' : ''}`}
                    onClick={() => table.setPageIndex(pageNumber)}
                    disabled={table.getState().pagination.pageIndex === pageNumber}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })
            }

            <button
              className="disabled:text-[#9E9E9E] flex items-center justify-center h-[44px] min-w-[44px] hover:bg-primary hover:text-white px-4"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="block">Next</span>

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" className="ml-2" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </>
          : <svg className="animate-spin mx-auto mt-12 h-16 w-16 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      }



      {(data && data.length <= 0) && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Icons.empty className="fill-white" />
          <p className="test-lg font-semibold mt-4">No Data</p>
          <p className="text-sm text-[#9E9E9E] mt-2">
            Sorry, data is not available in the table
          </p>
        </div>
      )}
    </>
  );
};

export default Table;
