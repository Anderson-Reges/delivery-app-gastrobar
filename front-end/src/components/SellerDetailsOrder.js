import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/Context';
import api from '../utils/fetch';

export default function SellerDetailsOrder({
  id, name, status, totalPrice, requestData, getOrder,
}) {
  const {
    disableDelivery, setDisableDelivery, disablePreparing, setDisablePreparing,
  } = useContext(MyContext);
  const NEGATIVE_FOUR = -4;
  const data = new Date(Date.parse(requestData));
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();

  const putStatus = async (sta) => {
    await api('PUT', `/sales/${id}`, { status: sta });
  };

  const setDisableButton = ({ target }) => {
    switch (target.value) {
    case 'Preparing':
      putStatus('Preparando');
      setDisablePreparing(true);
      setDisableDelivery(false);
      break;
    case 'Delivery':
      putStatus('Em Trânsito');
      setDisableDelivery(true);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    switch (status) {
    case 'Pendente':
      setDisablePreparing(false);
      setDisableDelivery(true);
      break;
    case 'Preparando':
      setDisablePreparing(true);
      setDisableDelivery(false);
      break;
    case 'Em Trânsito':
      setDisablePreparing(true);
      setDisableDelivery(true);
      break;
    case 'Entregue':
      setDisablePreparing(true);
      break;
    default:
      break;
    }
    getOrder();
  }, [getOrder, setDisableDelivery, setDisablePreparing, status]);

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
        value="Preparing"
        data-testid="seller_order_details__button-preparing-check"
        onClick={ setDisableButton }
        disabled={ disablePreparing }
      >
        Preparando pedido
      </button>

      <button
        type="button"
        value="Delivery"
        data-testid="seller_order_details__button-dispatch-check"
        onClick={ setDisableButton }
        disabled={ disableDelivery }
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
