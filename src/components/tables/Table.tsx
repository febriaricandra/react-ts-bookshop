import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  pageSizeOptions?: number[]; // Optional: Custom page size optionsfe
  onEdit: (row: T) => void; // Optional: Edit row handler
  onDelete: (row: T) => void; // Optional: Delete row handler
  //handle open modal
  onOpen: () => void;
}

export default function Table<T>({
  data,
  columns,
  pageSizeOptions = [5, 10, 20],
  onEdit,
  onDelete,
  onOpen,
}: TableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [dropdownId, setDropdownId] = React.useState<string | null>(null);

  const onToggleDropdown = (dropdownId: string) => {
    setDropdownId((prevDropdownId) => (prevDropdownId === dropdownId ? null : dropdownId));
  };

  const closeDropdown = () => {
    setDropdownId(null);
  };


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSizeOptions[0],
      },
    },
  });

  return (
    <div className="p-4" onClick={closeDropdown}>
      <div className="shadow-md sm:rounded-lg bg-gray-900 relative">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
            onClick={onOpen}
            type="button" className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 bg-primary-600 focus:outline-none focus:ring-primary-800">
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add product
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className="w-full text-sm text-left bg-gray-800 text-gray-400">
            <thead className="text-xs uppercase text-gray-400 bg-gray-700 border border-black">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <span className="pl-2 text-xs">🔼</span>,
                          desc: <span className="pl-2 text-xs">🔽</span>,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right uppercase">actions</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-700 hover:bg-gray-600">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  {/* {onEdit && onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button
                        onClick={() => onEdit(row.original)}
                        className="text-indigo-600 hover:text-indigo-900">
                        Edit
                        </button>
                      <button onClick={() => onDelete(row.original)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  )} */}
                  <td className="px-4 py-3 flex items-center justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onToggleDropdown(row.id)}
                      id={`items-dropdown-button-${row.id}`} data-dropdown-toggle={`items-dropdown-button-${row.id}`} className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    <div id={`items-dropdown-${row.id}`} data-dropdown={`items-dropdown-button-${row.id}`} className={`${dropdownId === row.id ? '' : 'hidden'} absolute right-10 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`} aria-labelledby={`items-dropdown-button-${row.id}`}>
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                        <li>
                          <a
                            href="#"
                            onClick={() => onEdit(row.original)}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>

                        <li>
                          <a href="#"
                            onClick={() => onDelete(row.original)}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                        </li>
                      </ul>
                      {/* <div className="py-1">
                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                      </div> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 bg-gray-800">
          <span className="text-sm font-normal text-gray-400">
            Showing{' '}
            <span className="font-semibold text-white">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-white">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getPrePaginationRowModel().rows.length
              )}
            </span>
          </span>
          <ul className="inline-flex item-stretch -space-x-px text-white">
            <li>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {'<'}
              </button>
            </li>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => table.setPageIndex(i)}
                  className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${i === table.getState().pagination.pageIndex ? 'bg-gray-700 text-white' : ''
                    }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {'>'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
