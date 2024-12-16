import { useState } from 'react';
import TableOrder from '../../components/tables/TableOrder';


function Orders() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  return (
    <div className="text-white">
      <TableOrder onOpen={onOpen} />
    </div>
  )
}

export default Orders