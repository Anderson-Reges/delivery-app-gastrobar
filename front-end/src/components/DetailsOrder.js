import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function DetailsOrder({ name, status, totalPrice, requestData }) {
  const { pathname } = useLocation();
  const NEGATIVE_FOUR = -4;
  const data = new Date(Date.parse(requestData));
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  return (
    <section>
      <h4
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        <p>
          Pedido
        </p>
        {(`0000${pathname.slice(pathname.length - 1)}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {name}
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {/* {requestData.slice(0, CUT_LIMIT).split('-').reverse().join('/')} */
          `${day}/${month}/${year}`
        }
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </h4>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled
      >
        Marcar como entregue
      </button>
      <h2 data-testid="customer_order_details__element-order-total-price">
        {totalPrice.replace('.', ',')}
      </h2>
    </section>
  );
}

DetailsOrder.propTypes = {
  name: PropTypes.any,
  status: PropTypes.any,
  totalPrice: PropTypes.shape({
    replace: PropTypes.func,
  }),
}.isRequired;
