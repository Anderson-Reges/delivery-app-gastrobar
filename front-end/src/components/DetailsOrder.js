import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/Context';
import api from '../utils/fetch';

export default function DetailsOrder({
  id, name, status, totalPrice, requestData, getOrder,
}) {
  const { disableDelivered, setDisableDelivered } = useContext(MyContext);
  const NEGATIVE_FOUR = -4;
  const data = new Date(Date.parse(requestData));
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  const putStatus = async (sta) => {
    await api('PUT', `/sales/${id}`, { status: sta })
      .then((info) => console.log(info.data));
  };

  useEffect(() => {
    switch (status) {
    case 'Pendente':
      setDisableDelivered(true);
      break;
    case 'Preparando':
      setDisableDelivered(true);
      break;
    case 'Em Trânsito':
      setDisableDelivered(false);
      break;
    case 'Entregue':
      setDisableDelivered(true);
      break;
    default:
      break;
    }
    getOrder();
  }, [getOrder, setDisableDelivered, status]);

  return (
    <section>
      <h4
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        <p>
          Pedido
        </p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {name}
      </h4>
      <h4
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {
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
        onClick={ () => putStatus('Entregue') }
        disabled={ disableDelivered }
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
