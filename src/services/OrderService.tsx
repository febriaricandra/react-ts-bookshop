import Api from "../utils/Api";

class OrderService {
    static async createOrder(order: any) {
        try {
            const response = await Api.post('/orders', order);
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

    static async getUserOrders() {
        try {
            const response = await Api.get('/user-orders');
            return response.data;
        } catch (error) {
            console.error("Failed to fetch user orders")
            throw new Error("Failed to fetch user orders")
        }
    }
}

export default OrderService;