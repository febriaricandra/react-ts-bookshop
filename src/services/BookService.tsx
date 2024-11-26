import Api from "../utils/Api";
import { Book } from "../@types/book";

type BookResponse = {
    data: Book[];
    status: boolean;
};

type BookDetailResponse = {
    data: Book;
    status: boolean;
};

class BookService {
    static async getBooks(): Promise<BookResponse> {
        try {
            const response = await Api.get<BookResponse>("/books");
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