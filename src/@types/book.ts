export type Book = {
    id: number;
    title: string;
    description: string;
    category: string;
    trending: boolean;
    cover_image: string;
    old_price: number;
    new_price: number;
}

export type BookResponse = {
    data: Book[];
    page: number;
    total_items: number;
    total_pages: number;
    status: boolean;
};