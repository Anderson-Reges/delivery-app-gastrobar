import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../context/Context';
import styles from './styles.module.scss';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const { setOrderId } = useContext(MyContext);
  const [backgroundStatus, setBackgroundStatus] = useState('');
  const NEGATIVE_FOUR = -4;
  const CUT_LIMIT = 10;

  useEffect(() => {
    setOrderId(id);
    if (status === 'Pendente') {
      setBackgroundStatus(styles.pending);
    } else if (status === 'Preparando') {
      setBackgroundStatus(styles.preparing);
    } else if (status === 'Em Trânsito') {
      setBackgroundStatus(styles.inTransit);
    } else {
      setBackgroundStatus(styles.delivered);
    }
  }, [id, setOrderId, status]);

  return (
    <Link
      to={ `/customer/orders/${id}` }
      id={ styles.card }
    >
      <h4 data-testid={ `customer_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h2 className={ `${styles.status} ${backgroundStatus}` }>
        { status }
      </h2>
      <div className={ styles.infoBox }>
        <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
          {saleDate.slice(0, CUT_LIMIT).split('-').reverse().join('/')}
        </h3>
        <h3 data-testid={ `customer_orders__element-card-price-${id}` }>
          R$
          { totalPrice.toString().replace('.', ',') }
        </h3>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  id: PropTypes.any,
  saleDate: PropTypes.any,
  status: PropTypes.any,
  totalPrice: PropTypes.shape({
    toString: PropTypes.func,
  }),
}.isRequired;
