import {useState, useEffect} from 'react'
import BookService from '../../services/BookService'
import { Book } from '../../@types/book'
import ProductCard from '../cards/ProductCard';


function ProductList() {
    const [books, setBooks] = useState<Book[] | undefined>();

    const fetchBooks = async () => {
      try {
        const response = await BookService.getBooks()
        console.log(response.data)
        setBooks(response.data)
      } catch (error) {
        console.error('error')
      }
    }
  
    useEffect(() => {
      fetchBooks()
    }, [])
  return (
    <div>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
            {books?.map((book) => (
            <ProductCard key={book.id} id={book.id} title={book.title} image={book.cover_image} new_price={book.new_price} old_price={book.old_price} description={book.description} />
            ))}
        </div>
    </div>
  )
}

export default ProductList