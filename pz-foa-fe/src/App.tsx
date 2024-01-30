// Home.js
import React, { useState } from 'react';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ProductList from './components/ProductList';
import OrdersList from './components/OrdersList';
import AddProductForm from './components/AddProductForm';
import { ProductInterface } from './interface/productInterface';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [cart, setCart] = useState<ProductInterface[]>([]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const addToCart = (product: ProductInterface): void => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: string): void => {
    setCart(
      cart.filter((pos) => {
        pos.productId !== productId;
      })
    );
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
          {currentPage !== 'login' && (
            <span onClick={() => navigateTo('login')}>Zaloguj</span>
          )}
          {currentPage !== 'register' && (
            <span onClick={() => navigateTo('register')}>Zarejestruj się</span>
          )}
        </div>
      </nav>
      {currentPage === 'login' && (
        <LoginForm
          onRegisterClick={() => navigateTo('register')}
          onForgotPasswordClick={() => navigateTo('forgotPassword')}
        />
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
