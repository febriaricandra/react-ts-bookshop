import { ChevronDown } from "lucide-react";
import { formatDate } from "../../utils/date";

interface Address {
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

interface Book {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    new_price: number;
    old_price: number;
    cover_image: string;
    trending: boolean;
    category: string;
}

interface User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;

}

interface Order {
    address: Address;
    books: Book[];
    created_at: string;
    deleted_at: string | null;
    email: string;
    id: number;
    name: string;
    phone: string;
    total_price: number;
    updated_at: string;
    user: User;
    user_id: number;
}

interface TableLatestOrderProps {
    data: Order[];
}

function TableLatestOrder({ data }: TableLatestOrderProps) {
    return (
        <div className="bg-[#1c2537] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Latest orders</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-sm text-gray-400">
                            <th className="text-left pb-4">Order ID:</th>
                            <th className="text-left pb-4">Date:</th>
                            <th className="text-left pb-4">Price:</th>
                            <th className="text-left pb-4">Status:</th>
                            <th className="text-right pb-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {data.map((order, index) => (
                            <tr key={index} className="border-b border-gray-700">
                                <td className="py-4">{order.id}</td>
                                <td>{formatDate(order.created_at)}</td>
                                <td>${order.total_price}</td>
                                <td>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-500">
                                        Completed
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button className="text-gray-400 hover:text-white">
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableLatestOrder