import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/Context';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const { setOrderId } = useContext(MyContext);
  const NEGATIVE_FOUR = -4;
  const CUT_LIMIT = 10;

  useEffect(() => setOrderId(id));

  return (
    <Link
      to={ `/customer/orders/${id}` }
    >
      <h4 data-testid={ `customer_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h2 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
        {saleDate.slice(0, CUT_LIMIT).split('-').reverse().join('/')}
      </h3>
      <h3 data-testid={ `customer_orders__element-card-price-${id}` }>
        { totalPrice.toString().replace('.', ',') }
      </h3>
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
