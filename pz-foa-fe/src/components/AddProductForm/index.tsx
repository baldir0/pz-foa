// AddProductForm.js
import React, { useState } from "react";
import "./styles.css"; // Importuj plik CSS

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = () => {
    // Walidacja pól przed dodaniem produktu
    if (!productName || !productDescription || !imageLink || !productPrice) {
      alert("Proszę uzupełnić wszystkie pola.");
      return;
    }

    // Stworzenie obiektu produktu
    const newProduct = {
      name: productName,
      description: productDescription,
      image: imageLink,
      price: parseFloat(productPrice),
    };

    // Wywołanie funkcji przekazanej przez prop, aby dodać produkt
    onAddProduct(newProduct);

    // Zresetowanie pól formularza po dodaniu produktu
    setProductName("");
    setProductDescription("");
    setImageLink("");
    setProductPrice("");
  };

  return (
    <div className="add-product-form">
      <h2>Dodaj Nowy Produkt</h2>
      <form>
        <label>Nazwa Produktu:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br />
        <label>Opis Produktu:</label>
        <input
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <br />
        <label>Odnośnik do Grafiki:</label>
        <input
          type="text"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
        <br />
        <label>Cena Produktu:</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleAddProduct}>
          Dodaj Produkt
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
