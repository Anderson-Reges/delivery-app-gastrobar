import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import OrderCard from '../../components/OrderCard';
import MyContext from '../../context/Context';
import api from '../../utils/fetch';
import styles from './styles.module.scss';

export default function Orders() {
  const { orders, setOrders } = useContext(MyContext);

  const getOrders = async () => {
    await api('GET', 'sales')
      .then((info) => setOrders(info.data));
  };

  useEffect(() => getOrders(), []);

  return (
    <div>
      <Navbar />
      <div className={ styles.cardsContainer }>
        {orders && orders.map(({ id, status, saleDate, totalPrice }) => (
          <OrderCard
            key={ id }
            id={ id }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
          />
        ))}
      </div>
    </div>
  );
}
