import Api from "../utils/Api";
import { Book, BookResponse } from "../@types/book";


type BookDetailResponse = {
    data: Book;
    status: boolean;
};

class BookService {
    static async getBooks(page: number,pageSize: number): Promise<BookResponse> {
        try {
            const response = await Api.get<BookResponse>(`/books?page=${page}&page_size=${pageSize}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch books")
            throw new Error("Failed to fetch books")
        }
    }

    static async getBookById(id: number): Promise<BookDetailResponse> {
        try {
            const response = await Api.get<BookDetailResponse>(`/books/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch book")
            throw new Error("Failed to fetch book")
        }
    }
}

export default BookService;