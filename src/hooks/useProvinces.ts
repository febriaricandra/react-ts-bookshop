import { useEffect, useState } from 'react';
import ShippingService from '../services/ShippingService';

const useProvinces = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ShippingService.getProvince();
        setProvinces(response);
      } catch (error) {
        setError("Failed to fetch provinces");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return { provinces, loading, error };
};

export default useProvinces;
