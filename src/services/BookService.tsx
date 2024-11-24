import Api from "../utils/Api";
import { Book } from "../@types/book";

type BookResponse = {
    data: Book[];
    status: boolean;
};

class BookService {
    static async getBooks() {
        try {
            const response = await Api.get<BookResponse>("/books");
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export default BookService;