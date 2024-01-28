// ProductList.js
import React from "react";
import "./styles.css"; // Importuj plik CSS

const products = [
  {
    id: 1,
    name: "Produkt 1",
    image: "https://example.com/image1.jpg",
    price: 19.99,
    description: "Opis produktu 1",
  },
  {
    id: 2,
    name: "Produkt 2",
    image: "https://example.com/image2.jpg",
    price: 29.99,
    description: "Opis produktu 2",
  },
  {
    id: 3,
    name: "Produkt 3",
    image: "https://example.com/image3.jpg",
    price: 39.99,
    description: "Opis produktu 3",
  },
];

const ProductList = () => {
  const handleAddToCart = (productId) => {
    // Obsługa dodawania do koszyka
    console.log(`Produkt o ID ${productId} został dodany do koszyka.`);
  };

  return (
    <div className="add-product-form">
      <h2>Lista Produktów</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={`Grafika ${product.name}`}
              style={{ maxWidth: "100px" }}
            />
            <h3>{product.name}</h3>
            <p>Cena: {product.price} zł</p>
            <p>Opis: {product.description}</p>
            <button onClick={() => handleAddToCart(product.id)}>
              Dodaj do koszyka
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
