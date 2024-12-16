type Address = {
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

export type Order = {
    name: string;
    email: string;
    address: Address;
    phone: string;
    total_price: number;
    book_ids: number[];
}