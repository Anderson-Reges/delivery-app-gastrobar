import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MyContext from '../../context/Context';
import api from '../../utils/fetch';
import ProductCard from '../../components/ProductCard';
import styles from './styles.module.scss';

export default function Products() {
  const history = useHistory();
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

  const redirectCheckout = () => {
    history.push('/customer/checkout');
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
      <div className={ styles.productsContainer }>
        {products && products.map(({ id, name, price, urlImage }) => (
          <ProductCard
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
          />
        ))}
      </div>
      <button
        type="button"
        disabled={ disabled }
        className={ styles.cartButton }
        onClick={ redirectCheckout }
      >
        <ion-icon name="cart" />
        <p>
          R$
          {' '}
          { totalPrice.toFixed(2).toString().replace('.', ',') }
        </p>
      </button>
    </main>
  );
}
