import PropTypes from 'prop-types';
import React from 'react';

export default function SellerDetailsOrder({
  id, name, status, totalPrice, requestData,
}) {
  const NEGATIVE_FOUR = -4;
  const data = new Date(Date.parse(requestData));
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  return (
    <section>
      <h4
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        <p>
          Pedido
        </p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h4
        data-testid="seller_order_details__element-order-details-label-seller-name"
      >
        {name}
      </h4>
      <h4
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {
          `${day}/${month}/${year}`
        }
      </h4>
      <h4
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {status}
      </h4>
      <button
        type="button"
        data-testid="seller_order_details__button-delivery-check"
        disabled
      >
        Marcar como entregue
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
      >
        Preparando pedido
      </button>

      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled
      >
        Saiu para entrega
      </button>
      <h2 data-testid="seller_order_details__element-order-total-price">
        {totalPrice.replace('.', ',')}
      </h2>
    </section>
  );
}

SellerDetailsOrder.propTypes = {
  name: PropTypes.any,
  status: PropTypes.any,
  totalPrice: PropTypes.shape({
    replace: PropTypes.func,
  }),
}.isRequired;
