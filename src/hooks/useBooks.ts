import { useState, useEffect } from "react";
import BookService from "../services/BookService";
import { Book } from "../@types/book";

const useBooks = () => {
  const [books, setBooks] = useState<Book[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await BookService.getBooks();
      setBooks(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Failed to fetch book details: ${error.message}`);
      } else {
        setError("Failed to fetch book details");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return { books, loading, error };
};

export default useBooks;