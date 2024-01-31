// ProductList.js
import React, { useEffect, useState } from 'react';
import './styles.css'; // Importuj plik CSS
import { ProductInterface } from '../../interface/productInterface';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = ({
  addToCart,
}: {
  addToCart: (product: ProductInterface) => void;
}) => {
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async (): Promise<any> => {
    const response = await axios.get('http://localhost:3000/product/list');
    if (response.status === 200) {
      toast('Product list obtained!', { type: 'info', toastId: '1' });
      return response.data[0];
    }
    throw Error('Failder to get product list.');
  };

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <>
      <div className='add-product-form'>
        <h2>Lista Produktów</h2>
        <ul>
          {products &&
            products.map((product) => (
              <div key={product.id}>
                <img
                  src={product.imgSrc}
                  alt={`Grafika ${product.name}`}
                  style={{ maxWidth: '100px' }}
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
    </>
  );
};

export default ProductList;
