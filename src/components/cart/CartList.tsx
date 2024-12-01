import { useCart } from "../../context/CartContext"
import ShoppingCartCard from "../cards/ShoppingCartCard";

function CartList() {
    const { cart } = useCart();
    return (
        <div>
            {cart.length === 0 ? (
                <div className="text-center text-2xl font-semibold text-gray-900 dark:text-white">Cart is empty</div>
            ) : (
                cart.map((item) => (
                    <ShoppingCartCard key={item.id} id={item.id} title={item.title} image={item.image} price={item.price} desc={item.description} />
                ))
            )}
        </div>
    )
}

export default CartList