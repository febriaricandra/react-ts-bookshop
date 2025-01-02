import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useFlashMessage } from '../../context/FlashMessageContext';
import { Link } from 'react-router-dom';

type ProductCardProps = {
    id: number;
    title: string;
    image: string;
    description: string;
    new_price: number;
    old_price: number;
}


function ProductCard({ id, title, image, new_price, old_price, description }: ProductCardProps) {
    const { addToCart } = useCart();
    const { showMessage } = useFlashMessage();

    const handleCart = () => {
        addToCart({ id, title, image, price: new_price, description })
        showMessage('Item added to cart', 'success')
    }

    return (
        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow border-gray-700">
            <Link to={`/books/${id}`}
                className='block max-h-52 overflow-hidden rounded-t-lg'>
                <img className="mx-auto rounded-t-lg object-cover" src={image} alt={title} />
            </Link>
            <div className="px-5 pb-5">
                <a href="#">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
                </a>
                <p className="mt-2 mb-4 text-sm text-gray-300">{description}</p>
                <div className="flex justify-between xl:flex-row">
                    <div className='flex items-center gap-2'>
                        {old_price !== new_price && old_price > new_price && <span className="text-md font-bold text-white line-through decoration-red-500 decoration-[2px]">${old_price}</span>}
                        <span className="text-3xl font-bold text-white">${new_price}</span>
                    </div>
                    <a
                        onClick={handleCart}
                        className="flex gap-2 cursor-pointer items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-2 rounded text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <ShoppingCart size={16} />
                        <span className='md:hidden'>Add to cart</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProductCard