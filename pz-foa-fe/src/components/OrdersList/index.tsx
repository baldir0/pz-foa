/*

// OrdersList.js
import React from "react";

const orders = [
  {
    id: 1,
    orderNumber: "ORD123",
    products: [
      { id: 1, name: "Produkt 1", quantity: 2 },
      { id: 2, name: "Produkt 2", quantity: 1 },
    ],
    total: 89.97,
  },
  {
    id: 2,
    orderNumber: "ORD456",
    products: [
      { id: 3, name: "Produkt 3", quantity: 3 },
      { id: 1, name: "Produkt 1", quantity: 1 },
    ],
    total: 139.96,
  },
];

const OrdersList = () => {
  return (
    <div>
      <h2>Lista Zamówień</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h3>Numer zamówienia: {order.orderNumber}</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.name} (Ilość: {product.quantity})
                </li>
              ))}
            </ul>
            <p>Łącznie do zapłaty: {order.total} zł</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
*/

// OrdersList.js
import React from "react";
import "./styles.css"; // Importuj plik CSS

const orders = [
  {
    id: 1,
    orderNumber: "ORD123",
    products: [
      { id: 1, name: "Produkt 1", quantity: 2 },
      { id: 2, name: "Produkt 2", quantity: 1 },
    ],
    status: "W realizacji",
  },
  {
    id: 2,
    orderNumber: "ORD456",
    products: [
      { id: 3, name: "Produkt 3", quantity: 3 },
      { id: 1, name: "Produkt 1", quantity: 1 },
    ],
    status: "Zrealizowane",
  },
];

const OrdersList = () => {
  return (
    <div className="add-product-form">
      <h2>Lista Zamówień</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h3>Numer zamówienia: {order.orderNumber}</h3>
            <p>Status zamówienia: {order.status}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product.id}>
                  {product.name} (Ilość: {product.quantity})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
