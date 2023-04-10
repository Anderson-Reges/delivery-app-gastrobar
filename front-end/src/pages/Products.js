import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MyContext from '../context/Context';
import api from '../utils/fetch';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const {
    products, setProducts,
    totalPrice, setTotalPrice,
    cartItens,
  } = useContext(MyContext);
  const [disabled, setDisabled] = useState(true);

  const getProducts = async () => {
    await api('GET', 'products')
      .then((info) => setProducts(info.data));
  };

  useEffect(() => {
    getProducts();
    const total = cartItens
      .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    setTotalPrice(total);

    if (total > 0) setDisabled(false);
    else setDisabled(true);
  }, [cartItens]);

  return (
    <main>
      <Navbar />
      <div>
        {products && products.map(({ id, name, price, urlImage }) => (
          <ProductCard
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
          />
        ))}
        <Link to="/customer/checkout">
          <button
            data-testid="customer_products__button-cart"
            type="button"
            disabled={ disabled }
          >
            Ver Carrinho: R$
            <p data-testid="customer_products__checkout-bottom-value">
              { totalPrice.toFixed(2).toString().replace('.', ',') }
            </p>
          </button>
        </Link>
      </div>
    </main>
  );
}
