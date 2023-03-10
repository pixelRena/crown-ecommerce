import './cart-item.styles.scss';

const CartItem = ({item}) => {
    const { name, quantity, price, imageUrl } = item;
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={name}/>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{quantity}</span>
            </div>
        </div>
    )
};

export default CartItem;