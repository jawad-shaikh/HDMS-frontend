import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Icons } from '../global/icons';

const Table = ({ data, columns }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<any>('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      globalFilter: search
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearch,
  });

  return (
    <>
    <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      <table className='w-full overflow-auto border border-gray'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='text-sm font-semibold bg-primary'>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='text-white text-left p-4'>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex min-w-[36px]'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {
                        (header.column.id === 'action' || header.column.id === 'status') ? null : {
                          asc: <span className='pl-2'>↑</span>,
                          desc: <span className='pl-2'>↓</span>,
                        }[header.column.getIsSorted() as string] ?? (
                            <span className='pl-2 flex items-center'>
                              <Icons.arrows />
                            </span>
                          )
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-b border-gray'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='text-sm p-4'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}

      </table>

      {(data.length <= 0) && <div className='flex flex-col items-center justify-center mt-20'>
        <Icons.empty className='fill-white' />
        <p className='test-lg font-semibold mt-4'>No Data</p>
        <p className='text-sm text-[#9E9E9E] mt-2'>Sorry, data is not available in the table</p>
      </div>}

    </>
  );
};

export default Table;