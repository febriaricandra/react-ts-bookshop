import Api from "../utils/Api";
import { Book, BookResponse } from "../@types/book";


type BookDetailResponse = {
    data: Book;
    status: boolean;
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
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

    static async createBook(book: FormData) {
        try {
            const response = await Api.post('/books', book, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to create book")
        }
    }
}

export default BookService;