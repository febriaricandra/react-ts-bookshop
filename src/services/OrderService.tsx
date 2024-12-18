import Api from "../utils/Api";


type User = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    email: string;
    name: string;
    is_admin: boolean;
};

type Address = {
    city: string;
    country: string;
    state: string;
    zipcode: string;
};

type OrderRequestBody = {
    name: string;
    email: string;
    address: Address;
    phone: string;
    total_price: number;
    book_ids: number[];
}

interface Book {
    id: number;
    title: string;
    author: string;
    new_price: number;
    old_price: number;
    cover_image: string;
}

export type Order = {
    id: number;
    name: string;
    email: string;
    address: Address;
    phone: string;
    total_price: number;
    book_ids: number[];
}

type OrderResponse = {
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
    books: Book[]; // This should match the structure of the response
};

class OrderService {
    static async createOrder(order: OrderRequestBody): Promise<OrderResponse> {
        try {
            const response = await Api.post<OrderResponse>('/orders', order);
            return response.data;
        } catch (error) {
            console.error("Failed to create order")
            throw new Error("Failed to create order")
        }
    }

    static async getOrders(page: number, pageSize: number) {
        try {
            const response = await Api.get(`/orders?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch orders")
            throw new Error("Failed to fetch orders")
        }
    }

    static async getOrdersById(id: number) {
        try {
            const response = await Api.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch order")
            throw new Error("Failed to fetch order")
        }
    }
}

export default OrderService;