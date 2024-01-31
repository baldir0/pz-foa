// Cart.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Cart = ({ cartItems, removeFromCart }) => {
  const newOrder = (cartItems) => {
    toast.promise(
      axios.post(
        'http://localhost:3000/order',
        {
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
        },
        { withCredentials: true }
      ),
      {
        pending: 'Tworzenie zamówienia ...',
        success: 'Zamówienie utworzone!',
        error: 'Nie udało się utworzyć zamówienia',
      }
    );
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
              </div>
              <br />
            </>
          ))}
        <button onClick={() => newOrder(cartItems)}>Zamów</button>
      </div>
    </div>
  );
};

export default Cart;
