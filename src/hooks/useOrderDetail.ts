import { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import { Order } from "../@types/orders";

const useOrderDetail = (id: number) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = async (id: number) => {
    try {
      const response = await OrderService.getOrdersById(id);
      setOrder(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch order details: ${err.message}`);
      } else {
        setError("Failed to fetch order details");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail(id);
  }, [id]);

  return { order, loading, error };
};

export default useOrderDetail;
