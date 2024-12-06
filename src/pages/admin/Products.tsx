import Table from "../../components/tables/Table"
import data from "../../components/tables/data.json"
import { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import ModalFormProduct from "../../components/modals/ModalFormProduct"

type Product = {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const columnHelper = createColumnHelper<Product>()

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'ID',
    }),
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('email', {
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor('phone', {
      cell: (info) => info.getValue(),
      header: 'Phone',
    }),
  ];

  const onOpen = () => {
    setIsOpen(true);
  }

  const onEdit = (row: Product) => {
    console.log('Edit', row);
  }

  const onDelete = (row: Product) => {
    console.log('Delete', row);
  }

  return (
    <div className="relative">

      <ModalFormProduct isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={() => setIsOpen(false)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="Novel">Novel</option>
              <option value="Fiction">Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
            <textarea id="description" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
          </div>
        </div>
      </ModalFormProduct>
      <Table<Product> data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} onOpen={onOpen} />
    </div>
  )
}

export default Products