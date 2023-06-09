import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import CheckoutList from '../../components/CheckoutList';
import FinalizingCheckout from '../../components/FinalizingCheckout';
import api from '../../utils/fetch';
import MyContext from '../../context/Context';
import styles from './styles.module.scss';

export default function Checkout() {
  const {
    cartItens, setCartItens, sellers, setSellers, setUser } = useContext(MyContext);

  const getProducts = () => {
    const getItens = localStorage.getItem('products');
    const itens = JSON.parse(getItens);
    setCartItens(itens);
  };

  const getSellerUsers = async () => {
    await api('POST', 'user', { role: 'seller' })
      .then((res) => setSellers(res.data));
  };

  useEffect(() => {
    getProducts();
    getSellerUsers();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <main>
      <Navbar />
      <div className={ styles.checkoutContainer }>
        <CheckoutList
          cartItens={ cartItens }
          getProducts={ getProducts }
        />
        <FinalizingCheckout
          sellers={ sellers }
          cartItens={ cartItens }
        />
      </div>
    </main>
  );
}
