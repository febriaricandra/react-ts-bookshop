import ProductCarousel from "../components/products/ProductCarousel"
import ProductList from "../components/products/ProductList"


export default function Home() {

  return (
    <div className="container mx-auto">
      <ProductCarousel />
      <ProductList />
    </div>
  )
}
