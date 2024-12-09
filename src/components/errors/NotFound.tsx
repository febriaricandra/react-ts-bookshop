function NotFound() {
    return (
        <section className="bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-white">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <a href="/" className="inline-block px-6 py-3 font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Go back home</a>
                </div>
            </div>
        </section>
    )
}

export default NotFound