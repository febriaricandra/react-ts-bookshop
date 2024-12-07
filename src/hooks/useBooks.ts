import { useState, useEffect } from "react";
import BookService from "../services/BookService";
import { BookResponse } from "../@types/book";

const useBooks = (page: number, pageSize: number) => {
  const [books, setBooks] = useState<BookResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await BookService.getBooks(page, pageSize);
      setBooks(response);
      console.log(response)
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
  }, [page, pageSize]);
  return { books, loading, error, totalItems: books?.total_items, totalPages: books?.total_pages, page: books?.page };
};

export default useBooks;