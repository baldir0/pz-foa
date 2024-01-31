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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLogged, setIsLogged] = useState(false);
  const [cart, setCart] = useState<ProductInterface[]>([]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const loggedOnlyPage = ['addProduct', 'orders', 'login', 'register'];
    if (loggedOnlyPage.includes(currentPage))
      axios
        .get('http://localhost:3000/auth/validate', { withCredentials: true })
        .then((result) => {
          if (result.status === 200) setIsLogged(true);
        })
        .catch(() => {
          setIsLogged(false);
        });
  }, [currentPage]);

  useEffect(() => {
    if (isLogged) {
      setCurrentPage('products');
    } else {
      setCurrentPage('login');
    }
  }, [isLogged]);

  const addToCart = (product: ProductInterface): void => {
    setCart([...cart, product]);
    toast(`${product.name} added to cart!`, { type: 'info' });
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
    const localCart = [...cart];
    const toRemove = localCart.findIndex((item) => {
      return item.productId === productId;
    });
    localCart.splice(toRemove, 1);
    setCart([...localCart]);
  };

  return (
    <div className='menu-container'>
      <nav>
        <ul>
          <li onClick={() => navigateTo('products')}>Lista Produktów</li>
          <li onClick={() => navigateTo('orders')}>Lista Zamówień</li>
          <li onClick={() => navigateTo('profile')}>Profil Użytkownika</li>
          <li onClick={() => navigateTo('addProduct')}>Dodaj nowy produkt</li>
          {/* Dodaj nową opcję */}
        </ul>
        <div className='login-options'>
          <ul>
            {!isLogged && currentPage !== 'login' && (
              <li onClick={() => navigateTo('login')}>Zaloguj</li>
            )}
            {!isLogged && currentPage !== 'register' && (
              <li onClick={() => navigateTo('register')}>Zarejestruj się</li>
            )}
            {isLogged && <li onClick={() => logout()}>Logout</li>}
            {currentPage !== 'Cart' && (
              <li onClick={() => navigateTo('Cart')}>Koszyk</li>
            )}
          </ul>
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
      <ToastContainer limit={3} />
    </div>
  );
};

export default Home;
