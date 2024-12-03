import Table from "../../components/tables/Table"
import data from "../../components/tables/data.json"
import { createColumnHelper } from "@tanstack/react-table"

type Product = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

function Products() {

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
  return (
    <div className="">
        <Table<Product> data={data} columns={columns} />
    </div>
  )
}

export default Products