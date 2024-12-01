function ShoppingCartCard({ id, title, image, price, desc }: { id: number, title: string, image: string, price: number, desc: string }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" key={id}>
            <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                    <img className="h-20 w-20 object-contain" src={image} alt={title} />
                </a>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                    <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{desc}</a>
                    <p className="text-base font-medium text-gray-900 dark:text-white">${price}</p>
                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => console.log('Remove from cart')}
                            type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartCard