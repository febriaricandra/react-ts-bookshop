import Carousel from '../carousels/Carousel'


function ProductCarousel() {
  return (
    <Carousel slideInterval={5000}>
        <img src="https://www.raycast.com/_next/image?url=https%3A%2F%2Fmisc-assets.raycast.com%2Fwallpapers%2Fblue_distortion_1_preview.png&w=1920&q=75" alt="Clothes" />
        <img src="https://www.raycast.com/_next/image?url=https%3A%2F%2Fmisc-assets.raycast.com%2Fwallpapers%2Fblue_distortion_2_preview.png&w=1920&q=75" alt="Shoes" />
        <img src="https://www.raycast.com/_next/image?url=https%3A%2F%2Fmisc-assets.raycast.com%2Fwallpapers%2Fmono_dark_distortion_1_preview.png&w=1920&q=75" alt="Bags" />
    </Carousel>
  )
}

export default ProductCarousel