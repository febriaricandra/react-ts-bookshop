import { useState, useEffect } from 'react';
import BookService from '../services/BookService';
import { Book } from '../@types/book';

const useBookDetail = (id: number) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookDetail = async (id: number) => {
        try {
            const response = await BookService.getBookById(id);
            setBook(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to fetch book details: ${err.message}`);
            } else {
                setError('Failed to fetch book details');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookDetail(id);
    }, [id]);

    return { book, loading, error };
};

export default useBookDetail;