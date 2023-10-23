// Cart.jsx
import React, { useState } from 'react';
import "../styles/cart.css";
import { Link } from 'react-router-dom';
import Payment from '../Pages/Payment';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {

  const[ispayment,setIsPayment] = useState(false)
  console.log(cartItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleIncrement = (itemId) => {
    updateQuantity(itemId, cartItems.find((item) => item.id === itemId).quantity + 1);
  };

  const handleDecrement = (itemId) => {
    const currentQuantity = cartItems.find((item) => item.id === itemId).quantity;
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  return (
    <div className="cart-sidebar">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems?.map((item) => (
          <li key={item.id}>
            <img src={item.img[0]} alt={item.title} style={{ width: '50px', height: '50px' }} />
            <span>{item.title}</span><br />
            
            <span>
              Quantity: <br />
              <button className='decreseBtn' onClick={() => handleDecrement(item.id)}>-</button>
              <input 
                type="number" 
                min="1" 
                value={item.quantity} 
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
              />
              <br />
              <button className='increaseBtn'  onClick={() => handleIncrement(item.id)}>+</button>
            </span><br />
            <span>Price: ${item.price * item.quantity}</span><br />
            <button onClick={() => removeFromCart(item.id)}>Remove</button><span>||</span>
            <button className='checkout'>
            <Link to={{ pathname: "/payment", state: { item : item }}}>Checkout</Link>
            </button> 
          </li>  
        ))}
      </ul>
      {/* {<Payment cartItems={cartItems}/>} */}
    </div>
  );
};

export default Cart;
