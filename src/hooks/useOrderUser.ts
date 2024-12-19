import { useEffect, useState } from "react";
import OrderService from "../services/OrderService";

const useOrderUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserOrder = async () => {
    try {
      const response = await OrderService.getUserOrders();
      setData(response);
      if (response && response.status === false) {
        setError("Failed to fetch user orders");
        throw new Error("Failed to fetch user orders");
      } else {
        setError(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to fetch user orders details: ${error.message}`);
      } else {
        setError("Failed to fetch user orders details");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);
  return {
    data,
    loading,
    error,
  };
};

export default useOrderUser;
