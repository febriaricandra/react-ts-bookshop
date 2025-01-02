import Api from "../utils/Api";

class ShippingService {
    static async getProvince(): Promise<any> {
        try {
            const response = await Api.get<any>('/provinces');
            return response.data.rajaongkir.results;
        } catch (error) {
            console.error("Failed to fetch shipping")
            throw new Error("Failed to fetch shipping")
        }
    }

    static async getCity(provinceId: string): Promise<any> {
        try {
            const response = await Api.get<any>(`/cities/${provinceId}`);
            return response.data.rajaongkir.results;
        } catch (error) {
            console.error("Failed to fetch shipping")
            throw new Error("Failed to fetch shipping")
        }
    }

    static async getCostOngkir(data: any): Promise<any> {
        try {
            const response = await Api.post<any>('/cost', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            return response.data.rajaongkir.results;
        } catch (error) {
            console.error("Failed to fetch shipping")
            throw new Error("Failed to fetch shipping")
        }
    }
}

export default ShippingService;