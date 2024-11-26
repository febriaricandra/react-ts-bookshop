import { useParams } from "react-router-dom"
import useBookDetail from "../hooks/useBookDetail"

function Details() {
    const { id } = useParams<{ id: string }>()

    const { book, loading, error } = useBookDetail(Number(id))

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!book) {
        return <div>Book not found</div>
    }

    return (
        <div className="font-sans text-white">
            <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
                    <div className="w-full lg:sticky top-0 sm:flex gap-2">
                        <img src={book.cover_image} alt="Product" className="w-full rounded-md object-cover" />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold">{book.title}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center flex-col justify-between xl:flex-row gap-2">
                                {book.old_price !== book.new_price && <span className="text-md font-bold text-gray-900 dark:text-white line-through decoration-red-500 decoration-[2px]">${book.old_price}</span>}
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">${book.new_price}</span>
                                <span className="text-red-500">*tax included</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-white-800">About the item</h3>
                            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-white-800">
                                <li>{book.description}</li>
                            </ul>
                        </div>

                        <button type="button" className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details