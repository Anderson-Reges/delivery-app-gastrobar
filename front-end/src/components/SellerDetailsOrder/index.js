import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/Context';
import api from '../../utils/fetch';
import styles from './styles.module.scss';

export default function SellerDetailsOrder({
  id, name, status, requestData, getOrder,
}) {
  const {
    disableDelivery, setDisableDelivery, disablePreparing, setDisablePreparing,
  } = useContext(MyContext);
  const NEGATIVE_FOUR = -4;
  const DATE_CUT_LIMIT = 10;
  const inTransit = 'Em Trânsito';
  const [classBack, setClassBack] = useState('');

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
      putStatus(inTransit);
      setDisableDelivery(true);
      break;
    default:
      break;
    }
  };

  const setStatusBackground = () => {
    if (status === 'Pendente') {
      setClassBack(styles.pending);
    } else if (status === 'Preparando') {
      setClassBack(styles.preparing);
    } else if (status === inTransit) {
      setClassBack(styles.inTransit);
    } else {
      setClassBack(styles.delivered);
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
    setStatusBackground();
  }, [getOrder, setDisableDelivery, setDisablePreparing, status]);

  return (
    <section className={ styles.infoContainer }>
      <h4 id={ styles.numberItem }>
        <p>
          Pedido
        </p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h4 id={ styles.nameItem }>
        {name}
      </h4>
      <h4 id={ styles.dateItem }>
        {
          requestData.slice(0, DATE_CUT_LIMIT).split('-').reverse().join('/')
        }
      </h4>
      <h4 className={ `${styles.statusItem} ${classBack}` }>
        {status}
      </h4>
      <button
        type="button"
        value="Preparing"
        id={ styles.buttonItem }
        onClick={ setDisableButton }
        disabled={ disablePreparing }
      >
        Preparando pedido
      </button>

      <button
        type="button"
        value="Delivery"
        id={ styles.buttonItem }
        onClick={ setDisableButton }
        disabled={ disableDelivery }
      >
        Saiu para entrega
      </button>
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
