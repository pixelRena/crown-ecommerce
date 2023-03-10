import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutPage = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {
                    cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} item={cartItem}/>)
                }
            </div>
            <Button buttonType="inverted" onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;