// src/components/Menu.js
import React, { useState } from 'react';
import ProductsList from './../ProductList';
import OrdersList from './../OrdersList';
// import UserProfile from "./../UserProfile";

function Menu() {
  const [activeMenu, setActiveMenu] = useState('products'); // Początkowo aktywne menu: 'products'

  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'products':
        return <ProductsList />;
      case 'orders':
        return <OrdersList />;
      // case 'profile':
      // return <UserProfile />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ul>
        <li onClick={() => setActiveMenu('products')}>Lista Produktów</li>
        <li onClick={() => setActiveMenu('orders')}>Lista Zamówień</li>
        <li onClick={() => setActiveMenu('profile')}>Profil Użytkownika</li>
      </ul>
      {renderMenuContent()}
    </div>
  );
}

export default Menu;
