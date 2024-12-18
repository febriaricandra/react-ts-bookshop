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
import { Order } from '../../@types/orders';
import OrderService from '../../services/OrderService';
import ModalDetailOrder from '../modals/ModalDetailOrder';
import { useEffect } from 'react';

const columnHelper = createColumnHelper<Order>();

export default function TableProduct() {
  const [data, setData] = React.useState<Order[]>([] as Order[]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [selectedOrder, setSelectedOrder] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const pageSize = 5; // Set page size here or use from props

  const handleOpenModal = (id: number) => {
    setOpen(true);
    setSelectedOrder(id);
    console.log(id);
  }

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: (info) => {
        const address = info.getValue();
        return (
          <i>
            {address.city}, {address.state}, {address.zipcode}, {address.country}
          </i>
        );
      },
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('total_price', {
      header: 'Total Price',
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.display({
      id: 'action',
      header: 'Action',
      cell: (info) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleOpenModal(info.row.original.id)}
            className="relative inline-flex items-center p-0.5 text-sm font-medium text-center text-white hover:text-gray-800 rounded-lg focus:outline-none text-gray-400 hover:text-gray-100" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
          </button>
          <ModalDetailOrder id={selectedOrder} isOpen={open} onClose={() => setOpen(false)} />
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
        const response = await OrderService.getOrders(page, pageSize);
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
        <section className="flex items-center bg-gray-50 bg-gray-900">
          <div className="w-full mx-auto">
            <div className="relative overflow-hidden shadow-md bg-gray-800 sm:rounded-lg">
              <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                <div>
                  <h5 className="mr-3 font-semibold text-white">List Orders</h5>
                  <p className="text-gray-400">Manage Orders</p>
                </div>
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
