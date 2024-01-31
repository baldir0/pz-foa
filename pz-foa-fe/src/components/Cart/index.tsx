// Cart.js
import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, removeFromCart }) => {
  const newOrder = (cartItems) => {
    axios.post('http://localhost:3000/orders', {
      address: 'delivery address',
      firstName: 'user first name',
      lastName: 'user last name',
      products: cartItems.map((pos) => {
        return {
          productId: pos.productId,
          amount: pos.amount,
          price: pos.price,
        };
      }),
    });
  };
  return (
    <div>
      <h2>Koszyk</h2>
      <p>Koszyk</p>
      <div>
        {cartItems &&
          cartItems.map((item, index) => (
            <>
              <div key={index}>
                {item.image}
                Nazwa produktu: {item.name}
                Cena: {item.price} zł ilość: {item.amount}
                <button
                  type='button'
                  onClick={() => removeFromCart(item.productId)}
                >
                  {' '}
                  Usuwanie pozycji
                </button>
                <button onClick={() => newOrder(cartItems)}>Zamów</button>
              </div>
              <br />
            </>
          ))}
      </div>
    </div>
  );
};

export default Cart;
