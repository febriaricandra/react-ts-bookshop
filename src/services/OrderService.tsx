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
    book_ids: number[]; 
    user: User;
}

type Data = {
    data: OrderResponse[];
    page: number;
    total_pages: number;
    total_items: number;
    status: boolean;
}

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

    static async getOrders(page: number, pageSize: number): Promise<Data> {
        try {
            const response = await Api.get<Data>(`/orders?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch orders")
            throw new Error("Failed to fetch orders")
        }
    }

    static async getOrdersById(id: number): Promise<OrderResponse> {
        try {
            const response = await Api.get<OrderResponse>(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch order")
            throw new Error("Failed to fetch order")
        }
    }
}

export default OrderService;