import { useEffect, useState } from 'react';
import ShippingService from '../services/ShippingService';

const useCities = (provinceId: string) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!provinceId) return; // Don't fetch if no province is selected
      try {
        const response = await ShippingService.getCity(provinceId);
        setCities(response);
      } catch (error) {
        setError("Failed to fetch cities");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [provinceId]);

  return { cities, loading, error };
};

export default useCities;
