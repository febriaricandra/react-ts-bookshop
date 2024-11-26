type ProductCardProps = {
    id: number;
    title: string;
    image: string;
    description: string;
    new_price: number;
    old_price: number;
}


function ProductCard({ id, title, image, new_price, old_price, description }: ProductCardProps) {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={`/books/${id}`}
                className='block max-h-52 overflow-hidden rounded-t-lg'>
                <img className="p-8 rounded-t-lg object-cover" src={image} alt={title} />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="mt-2 mb-4 text-sm text-gray-500 dark:text-gray-300">{description}</p>
                <div className="flex items-center flex-col justify-between xl:flex-row">
                    {old_price !== new_price && <span className="text-md font-bold text-gray-900 dark:text-white line-through decoration-red-500 decoration-[2px]">${old_price}</span>}
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${new_price}</span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard