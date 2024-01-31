// Home.js
import React, { useEffect, useState } from 'react';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ProductList from './components/ProductList';
import OrdersList from './components/OrdersList';
import AddProductForm from './components/AddProductForm';
import { ProductInterface } from './interface/productInterface';
import Cart from './components/Cart';
import axios from 'axios';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLogged, setIsLogged] = useState(false);
  const [cart, setCart] = useState<ProductInterface[]>([]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (isLogged) {
      setCurrentPage('products');
    } else {
      setCurrentPage('login');
    }
  }, [isLogged]);

  const addToCart = (product: ProductInterface): void => {
    setCart([...cart, product]);
    console.log(product);
  };

  const logout = async () => {
    const response = await axios.get('http://localhost:3000/auth/logout', {
      withCredentials: true,
    });

    if (response.status === 200) {
      setIsLogged(false);
    }
  };

  const removeFromCart = (productId: string): void => {
    //setCart(
    // cart.filter((pos) => {
    // pos.productId !== productId;
    //})
    //);
    console.log(
      cart.filter((pos) => {
        pos.productId !== productId;
        console.log(productId);
        console.log(pos.productId !== productId);
      })
    );
    const _cart = cart;
    const indextoremove = _cart.findIndex((pos) => pos.productId === productId);
    _cart.slice(indextoremove, 1);
    setCart([..._cart]);
    console.log(_cart);
    console.log(cart);
    console.log(indextoremove);
  };

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => navigateTo('products')}>Lista Produktów</li>
          <li onClick={() => navigateTo('orders')}>Lista Zamówień</li>
          <li onClick={() => navigateTo('profile')}>Profil Użytkownika</li>
          <li onClick={() => navigateTo('addProduct')}>
            Dodaj nowy produkt
          </li>{' '}
          {/* Dodaj nową opcję */}
        </ul>
        <div className='login-options'>
          {!isLogged && currentPage !== 'login' && (
            <span onClick={() => navigateTo('login')}>Zaloguj</span>
          )}
          {!isLogged && currentPage !== 'register' && (
            <span onClick={() => navigateTo('register')}>Zarejestruj się</span>
          )}
          {isLogged && <span onClick={() => logout()}>Logout</span>}
          {currentPage !== 'Cart' && (
            <span onClick={() => navigateTo('Cart')}>Koszyk</span>
          )}
        </div>
      </nav>
      {currentPage === 'login' && (
        <LoginForm
          onRegisterClick={() => navigateTo('register')}
          onForgotPasswordClick={() => navigateTo('forgotPassword')}
          login={setIsLogged}
        />
      )}
      {currentPage === 'Cart' && (
        <Cart cartItems={cart} removeFromCart={removeFromCart} />
      )}
      {currentPage === 'register' && (
        <RegisterForm onBackToLoginClick={() => navigateTo('login')} />
      )}
      {currentPage === 'forgotPassword' && (
        <ForgotPasswordForm onBackToLoginClick={() => navigateTo('login')} />
      )}
      {currentPage === 'products' && <ProductList addToCart={addToCart} />}
      {currentPage === 'orders' && <OrdersList />}
      {currentPage === 'addProduct' && (
        <AddProductForm onAddProduct={() => {}} />
      )}{' '}
      {/* Dodaj formularz dla nowej opcji */}
    </div>
  );
};

export default Home;
