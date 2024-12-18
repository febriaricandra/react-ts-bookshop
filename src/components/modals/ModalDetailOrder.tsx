import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import OrderService from '../../services/OrderService'


interface Address {
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

interface Book {
    // Define the properties of a book based on your data structure
    id: number;
    title: string;
    author: string;
    new_price: number;
    // Add other properties as needed
}

interface User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    // Add other properties as needed
}

interface Order {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    email: string;
    address: Address;
    phone: string;
    total_price: number;
    user_id: number;
    user: User;
    books: Book[];
}


interface OrderDetailModalProps {
    isOpen: boolean
    onClose: () => void
    id: number
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, id }) => {
    const [order, setOrder] = useState<Order | null>(null);
    if (!isOpen) return null

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await OrderService.getOrdersById(id);
                setOrder(response);
                console.log(response);
            } catch (err) {
                console.log(err);
            }

        }
        fetchOrderDetail();
    }, [isOpen]);

    console.log(order);


    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex items-center justify-center overflow-hidden">
            <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 my-8 text-gray-100">
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-semibold">Order Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200 transition duration-150 ease-in-out"
                    >
                        <X size={24} />
                    </button>
                </div>

                {order ? (
                    <div className="p-6">
                        <div className="mb-6">
                            <p className="text-sm text-gray-400">Date: {order.created_at}</p>
                        </div>
                        <div className=''>
                            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                            <table className="table-auto">
                                <tbody>
                                    <tr>
                                        <td className="font-semibold">Name:</td>
                                        <td>{order.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Email:</td>
                                        <td>{order.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Phone:</td>
                                        <td>{order.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold">Address:</td>
                                        <td>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="my-6">
                            <h3 className="text-lg font-semibold mb-2">Items</h3>
                            <ul className="divide-y divide-gray-700">
                                {order.books.map((item) => (
                                    console.log(item),
                                    <li key={item.id} className="py-2 flex justify-between">
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                        </div>
                                        <p className="font-medium">${item.new_price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center font-semibold text-lg">
                            <p>Total</p>
                            <p>${order.total_price}</p>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center my-4'>
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDetailModal

