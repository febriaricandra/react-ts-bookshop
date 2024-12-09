import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { Book } from '../../@types/book';
import BookService from '../../services/BookService';
import { useEffect } from 'react';

interface TableProductProps {
  pageSizeOptions?: number[];
  onOpen: () => void;
}

const columnHelper = createColumnHelper<Book>();

export default function TableProduct({
  onOpen,
}: TableProductProps) {
  const [data, setData] = React.useState<Book[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const pageSize = 5; // Set page size here or use from props

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => <i>{info.getValue()}</i>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('trending', {
      header: 'Trending',
      cell: (info) => (info.getValue() ? 'Yes' : 'No'),
    }),
    columnHelper.accessor('cover_image', {
      header: 'Cover Image',
      cell: (info) => <img src={info.getValue()} alt="cover" className="w-14 h-24 object-cover" />,
    }),
    columnHelper.accessor('old_price', {
      header: 'Old Price',
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.accessor('new_price', {
      header: 'New Price',
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const dropdown = document.getElementById(`dropdown-${info.row.id}`);
              if (dropdown) {
                dropdown.classList.toggle('hidden');
              }

              // Close other dropdowns
              const dropdowns = document.querySelectorAll('[data-dropdown-content]');
              dropdowns.forEach((dropdown) => {
                if (dropdown.id !== `dropdown-${info.row.id}`) {
                  dropdown.classList.add('hidden');
                }
              });
            }}
            id={`button-dropdown-${info.row.id}`}
            data-dropdown-toggle={`button-dropdown-${info.row.id}`}
            className="relative inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none text-gray-400 hover:text-gray-100" type="button">
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          <div
            id={`dropdown-${info.row.id}`}
            data-dropdown-content={`dropdown-${info.row.id}`}
            className="absolute z-10 right-8 hidden w-48 py-1 mt-4 rounded-lg shadow-lg bg-gray-700">
            <button className="block py-2 px-4 hover:bg-gray-100 hover:bg-gray-600 hover:text-white w-full">Edit</button>
            <button className="block py-2 px-4 hover:bg-gray-100 hover:bg-gray-600 hover:text-white w-full">Delete</button>
          </div>
        </div>
      ),
    }),
  ];

  // const onEdit = (book: Book) => {
  //   console.log('Edit:', book);
  // };

  // const onDelete = (book: Book) => {
  //   console.log('Delete:', book);
  // };

  const onPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BookService.getBooks(page, pageSize);
        setData(response.data);
        setTotalPages(response.total_pages); // Update total pages from response
        setTotalItems(response.total_items); // Update total items from response
        console.log(response);
      } catch (error) {
        console.log('Failed to fetch book details:', error);
      }
    };
    fetchBooks();
  }, [page]);

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
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="p-4">
      <div className="shadow-md sm:rounded-lg bg-gray-900">
        {/* <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
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
        </div> */}
        <section className="flex items-center bg-gray-50 bg-gray-900">
          <div className="w-full mx-auto">
            <div className="relative overflow-hidden shadow-md bg-gray-800 sm:rounded-lg">
              <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                <div>
                  <h5 className="mr-3 font-semibold text-white">List Products</h5>
                  <p className="text-gray-400">Manage all your products or add a new one</p>
                </div>
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
          </div>
        </section>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 bg-gray-800">
          <span className="text-sm font-normal text-gray-400">
            Showing{' '}
            <span className="font-semibold text-white">
              {((page - 1) * pageSize) + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-white">
              {Math.min(page * pageSize, totalItems)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-white">
              {totalItems}
            </span>
          </span>
          <ul className="inline-flex item-stretch -space-x-px text-white">
            <li>
              <button
                onClick={onPrevious}
                disabled={page <= 1}
                className="flex items-center justify-center h-full py-1.5 px-3 rounded-l-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                {'<'}
              </button>
            </li>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(1, page - 2); // Halaman awal
              const pageNumber = startPage + i; // Menghitung nomor halaman

              // Pastikan pageNumber tidak melebihi totalPages
              if (pageNumber > totalPages) return null;

              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => setPage(pageNumber)}
                    className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 :hover:text-white ${pageNumber === page ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={onNext}
                disabled={page >= totalPages}
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 rounded-r-lg border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
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
