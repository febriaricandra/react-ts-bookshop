import { useCart } from "../context/CartContext"
import CartList from "../components/cart/CartList";

function Carts() {
    const { cart, totalPrice } = useCart();

    //tax 11%f
    const tax = 0.11;
    const totalTax = cart.reduce((acc, item) => acc + item.price, 0) * tax;

    const orderSummary = cart.reduce((acc, item) => acc + item.price, 0) + totalTax;


    return (
        <section className="py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            <CartList />
                        </div>
                        <div className="hidden xl:mt-8 xl:block">
                            <h3 className="text-2xl font-semibold text-gray-900 text-white">People also bought</h3>
                            <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                                <div className="space-y-6 overflow-hidden rounded-lg border p-6 shadow-sm border-gray-700 bg-gray-800">
                                    <a href="#" className="overflow-hidden rounded">
                                        <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                        <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold leading-tight hover:underline text-white">iMac 27”</a>
                                        <p className="mt-2 text-base font-normal text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900 text-white">
                                            <span className="line-through"> $399,99 </span>
                                        </p>
                                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                            </svg>
                                        </button>
                                        <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 bg-gray-700">
                                            Add to favourites
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6 overflow-hidden rounded-lg border p-6 shadow-sm border-gray-700 bg-gray-800">
                                    <a href="#" className="overflow-hidden rounded">
                                        <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                        <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold leading-tight hover:underline text-white">iMac 27”</a>
                                        <p className="mt-2 text-base font-normal text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900 text-white">
                                            <span className="line-through"> $399,99 </span>
                                        </p>
                                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                            </svg>
                                        </button>
                                        <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 bg-gray-700">
                                            Add to favourites
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-6 overflow-hidden rounded-lg border p-6 shadow-sm border-gray-700 bg-gray-800">
                                    <a href="#" className="overflow-hidden rounded">
                                        <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                        <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <div>
                                        <a href="#" className="text-lg font-semibold leading-tight hover:underline text-white">iMac 27”</a>
                                        <p className="mt-2 text-base font-normal text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-gray-900 text-white">
                                            <span className="line-through"> $399,99 </span>
                                        </p>
                                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 p-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                            </svg>
                                        </button>
                                        <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 bg-gray-700">
                                            Add to favourites
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-white">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-white">
                                            {totalPrice}
                                        </dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-white">
                                            {totalTax}
                                        </dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t pt-2 border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 text-white">${orderSummary}</dd>
                                </dl>
                            </div>

                            <button type="button" className="w-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carts