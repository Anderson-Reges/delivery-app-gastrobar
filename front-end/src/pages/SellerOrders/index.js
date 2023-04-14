import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../utils/fetch';
import styles from './styles.module.scss';

export default function SellerOrders() {
  const [orderList, SetOrderList] = useState([]);
  const DATE_CUT_LIMIT = 10;
  const NEGATIVE_FOUR = -4;

  const getSellerOrders = async () => {
    await api('GET', 'sales/')
      .then((res) => SetOrderList(res.data));
  };

  const setColor = (status) => {
    if (status === 'Pendente') {
      return styles.pending;
    } if (status === 'Preparando') {
      return styles.preparing;
    } if (status === 'Em Trânsito') {
      return styles.inTransit;
    }
    return styles.delivered;
  };

  useEffect(() => {
    getSellerOrders();
  }, []);
  return (
    <main>
      <Navbar />
      <div className={ styles.ordersContainer }>
        {orderList && orderList.map(({
          id,
          deliveryAddress,
          deliveryNumber,
          saleDate,
          status,
          totalPrice,
        }) => (
          <Link
            key={ id }
            to={ `/seller/orders/${id} ` }
            id={ styles.card }
          >
            <h4>
              <p>
                Pedido
              </p>
              {(`0000${id}`).slice(NEGATIVE_FOUR)}

            </h4>
            <div className={ styles.infoContainer }>
              <div className={ styles.infoRequest }>
                <h2 className={ `${styles.status} ${setColor(status)}` }>
                  {status}
                </h2>
                <div className={ styles.infoBox }>
                  <h3>
                    {saleDate.slice(0, DATE_CUT_LIMIT).split('-').reverse().join('/')}
                  </h3>
                  <h3>
                    {`R$ ${totalPrice.replace('.', ',')}`}
                  </h3>
                </div>
              </div>
              <p>
                {`Endereço: ${deliveryAddress}, ${deliveryNumber}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
