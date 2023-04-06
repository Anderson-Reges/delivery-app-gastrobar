import PropTypes from 'prop-types';
import React from 'react';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const NEGATIVE_FOUR = -4;
  const data = new Date(Date.parse(saleDate));
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  return (
    <section>
      <h4 data-testid={ `customer_orders__element-order-id-${id}` }>
        <p>Pedido</p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h2 data-testis={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
        {`${day}/${month}/${year}`}
      </h3>
      <h3 data-testid={ `customer_orders__element-card-price-${id}` }>
        { totalPrice.toString().replace('.', ',') }
      </h3>
    </section>
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
