import { createContext, useState, useEffect } from "react";

// * Helpers
const addCartItem = (cartItems, productToAdd) => { 
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if(existingCartItem) {
        return(cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem ))
    };

    return ([...cartItems, {...productToAdd, quantity:1}]);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    // check if quantity is equal to 1, if it is remove that item from cart
    if(existingCartItem.quantity === 1) return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity-1} : cartItem);
};

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    setIsCartOpen: () => {},
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems,
        cartCount, 
        cartTotal, 
        removeItemFromCart, 
        clearItemFromCart};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
