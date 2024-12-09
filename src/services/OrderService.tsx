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
    books: any; 
    user: User;
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
}

export default OrderService;