import ProductCarousel from "../components/products/ProductCarousel"
import ProductList from "../components/products/ProductList"


export default function Home() {

  return (
    <div className="container mx-auto">
      <ProductCarousel />
      <ProductList />
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-white">
              Start shopping with Flowbite today
            </h2>
            <p className="mb-6 font-md text-white text-gray-400 md:text-lg">
              Buy books, electronics, fashion, and more from our online store. Get started with a free shipping for 30 days.
            </p>
            <a href="#" className=" inline-block px-6 py-3 font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Check out our products
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
