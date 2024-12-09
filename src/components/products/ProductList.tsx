import useBooks from '../../hooks/useBooks';
import ProductCard from '../cards/ProductCard';
import { useState } from 'react';
import NotFound from '../errors/NotFound';


function ProductList() {
  const [pages, setPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { books, loading, error, totalItems, totalPages, page } = useBooks(pages, pageSize);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <NotFound />
  }
  

  console.log(page, pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
        {books?.data?.map((book) => (
          <ProductCard key={book.id} id={book.id} title={book.title} image={book.cover_image} new_price={book.new_price} old_price={book.old_price} description={book.description} />
        ))}
      </div>

      {/* Pagination Navigation */}
      {totalItems && totalPages && page && (
        <div className="flex justify-center my-4">
          <button onClick={() => setPages(pages - 1)} disabled={pages === 1} className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100">Previous</button>
          <span className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100">{page} of {totalPages}</span>
          <span className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100">Total Items: {totalItems}</span>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <button onClick={() => setPages(pages + 1)} disabled={pages === totalPages} className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100">Next</button>
        </div>
      )}
    </div>
  )
}

export default ProductList