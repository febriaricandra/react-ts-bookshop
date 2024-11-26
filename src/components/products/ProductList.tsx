import useBooks from '../../hooks/useBooks';
import ProductCard from '../cards/ProductCard';


function ProductList() {
  const { books, loading, error } = useBooks();

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

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