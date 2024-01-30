// ProductList.js
import React, { useCallback, useEffect, useState } from "react";
import "./styles.css"; // Importuj plik CSS
import { ProductInterface } from "../../interface/productInterface";
import axios from "axios";

const products = [
  {
    id: "1",
    name: "Produkt 1",
    image:
      "https://i.pinimg.com/564x/3f/a2/87/3fa287c717ff7a7102e6d872c68b5bda.jpg",
    price: 19.99,
    description: "Opis produktu 1",
  },
  {
    id: "2",
    name: "Produkt 2",
    image:
      "https://i.pinimg.com/564x/af/bf/64/afbf6429e91a83229edea43375a58312.jpg",
    price: 29.99,
    description: "Opis produktu 2",
  },
  {
    id: "3",
    name: "Produkt 3",
    image:
      "https://i.pinimg.com/564x/3f/a2/87/3fa287c717ff7a7102e6d872c68b5bda.jpg",
    price: 39.99,
    description: "Opis produktu 3",
  },
];

const ProductList = ({
  addToCart,
}: {
  addToCart: (product: ProductInterface) => void;
}) => {
  // const handleAddToCart = (productId: string) => {
  //   // Obsługa dodawania do koszyka
  //   console.log(`Produkt o ID ${productId} został dodany do koszyka.`);
  // };

  const getProducts = async () => {
    return await axios.get("http://localhost:3000/product/list");
  };

  const [products, setProducts] = useState();
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <div className="add-product-form">
      <h2>Lista Produktów</h2>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <img
              src={product.image}
              alt={`Grafika ${product.name}`}
              style={{ maxWidth: "100px" }}
            />
            <h3>{product.name}</h3>
            <p>Cena: {product.price} zł</p>
            <p>Opis: {product.description}</p>
            <button
              onClick={() =>
                addToCart({
                  name: product.name,
                  productId: product.id,
                  amount: 1,
                  price: product.price,
                })
              }
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
