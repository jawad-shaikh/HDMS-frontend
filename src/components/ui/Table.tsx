import React, { useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";

const Table = ({ data, columns, departments, hods, hrs, setQuery, lastUpdate,uploadDate, requestDate,expireDate, status }: any) => {

  const pathname = usePathname()
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<any>("");

  const [departmentQuery, setDepartmentQuery] = useState('')
  const [hodQuery, setHodQuery] = useState('')
  const [hrQuery, setHrQuery] = useState('hrId=0')

  const [statusQuery, setStatusQuery] = useState('status=0')


  const [updateDateQuery, setUpdateDateQuery] = useState('start=0&end=0')
  const [uploadDateQuery, setUploadDateQuery] = useState('start=0&end=0')
  const [expireDateQuery, setExpireDateQuery] = useState('startExpiry=0&endExpiry=0')
  const [requestedDateQuery, setRequestedDateQuery] = useState('start=0&end=0')


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

  useEffect(() => {
    console.log(updateDateQuery)
    if (pathname === "/users") {
      setQuery(`?${departmentQuery}&${updateDateQuery}`)
    }
    if (pathname === "/department") {
      setQuery(`?${hodQuery}&${updateDateQuery}`)
    }

    if (pathname === "/required-documents") {
      setQuery(`?${requestedDateQuery}`)
    }

    if (pathname === "/received-documents") {
      setQuery(`?${hrQuery}&${expireDateQuery}&${uploadDateQuery}`)
    }

    if (pathname === "/document-history" || pathname === "/upload-documents") {
      setQuery(`?${hrQuery}&${expireDateQuery}&${uploadDateQuery}&${statusQuery}`)
    }

    if (pathname === "/expired-documents") {
      setQuery(`?${expireDateQuery}&${uploadDateQuery}&${statusQuery}`)

    }
    if(pathname === "/department-expired-documents") {
      setQuery(`${expireDateQuery}&${uploadDateQuery}`)
    }
  }, [hodQuery, departmentQuery, updateDateQuery, requestedDateQuery,uploadDateQuery, expireDateQuery, hrQuery, statusQuery])

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex w-[300px] items-center border-2 border-gray p-2 gap-2">
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

        <div className="flex items-center gap-4">

          {departments && <select
            value={departmentQuery}
            onChange={(e) => setDepartmentQuery(e.target.value)}
            defaultValue={"departmentId=0"}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
            name="department"
          >
            <option value={'departmentId=0'}>
              All Department
            </option>
            {departments.map((department: any) => ({ id: department.id, name: department.name }))?.map((object: any, index: number) => (
              <option key={index} value={`departmentId=${object.id}`}>
                {object.name}
              </option>
            ))}
          </select>}

          {hods?.length ? <select
            value={hodQuery}
            onChange={(e) => setHodQuery(e.target.value)}
            defaultValue={"hodId=0"}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
            name="department"
          >
            <option value={'hodId=0'}>
              All HOD
            </option>
            {hods?.map((hod: any) => ({ id: hod.id, name: hod.firstName + " " + hod.lastName }))?.map((object: any, index: number) => (
              <option key={index} value={`hodId=${object.id}`}>
                {object.name}
              </option>
            ))}
          </select> : null}

          {hrs?.length ? <select
            value={hrQuery}
            onChange={(e) => setHrQuery(e.target.value)}
            defaultValue={"hrId=0"}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
            name="department"
          >
            <option value={'hrId=0'}>
              All HOD
            </option>
            {hrs?.map((hod: any) => ({ id: hod.id, name: hod.firstName + " " + hod.lastName }))?.map((object: any, index: number) => (
              <option key={index} value={`hrId=${object.id}`}>
                {object.name}
              </option>
            ))}
          </select> : null}

          {lastUpdate && <select
            defaultValue={'start=0&end=0'}
            value={updateDateQuery}
            onChange={(e) => setUpdateDateQuery(e.target.value)}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
          >
            <option value={'start=0&end=0'}>
              All Updated
            </option>
            {[{ id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Today" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 7)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 7 Days" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 30)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 30 Days" }]?.map((object: any, index: number) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>}

          {uploadDate && <select
            defaultValue={'start=0&end=0'}
            value={uploadDateQuery}
            onChange={(e) => setUploadDateQuery(e.target.value)}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
          >
            <option value={'start=0&end=0'}>
              All Uploads
            </option>
            {[{ id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Today" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 7)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 7 Days" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 30)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 30 Days" }]?.map((object: any, index: number) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>}

          {expireDate && <select
            defaultValue={'startExpiry=0&endExpiry=0'}
            value={expireDateQuery}
            onChange={(e) => setExpireDateQuery(e.target.value)}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
          >
            <option value={'startExpiry=0&endExpiry=0'}>
              All Expired
            </option>
            {[{ id: `startExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()).toISOString()}&endExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Today" }, { id: `startExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() - 7)).toDateString()).toISOString()}&endExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 7 Days" }, { id: `startExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() - 30)).toDateString()).toISOString()}&endExpiry=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 30 Days" }]?.map((object: any, index: number) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>}

          {requestDate && <select
            defaultValue={'start=0&end=0'}
            value={requestedDateQuery}
            onChange={(e) => setRequestedDateQuery(e.target.value)}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
          >
            <option value={'start=0&end=0'}>
              Requested Date
            </option>
            {[{ id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Today" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 7)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 7 Days" }, { id: `start=${new Date(new Date(new Date().setDate(new Date().getDate() - 30)).toDateString()).toISOString()}&end=${new Date(new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()).toISOString()}`, name: "Last 30 Days" }]?.map((object: any, index: number) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>}

          {status && <select
            defaultValue={'status=0'}
            value={statusQuery}
            onChange={(e) => setStatusQuery(e.target.value)}
            className="block border-2 bg-white border-gray w-[12rem] p-2 outline-none"
          >
            <option value={'status=0'}>
             All Status
            </option>
            {[{id: "status=APPROVED", name : "APPROVED"}, {id: "status=PENDING", name : "PENDING"}, {id: "status=REJECTED", name : "REJECTED"}]?.map((object: any, index: number) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </select>}

        </div>

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
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
