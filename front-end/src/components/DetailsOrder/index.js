import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/Context';
import api from '../../utils/fetch';
import styles from './styles.module.scss';

export default function DetailsOrder({
  id, name, status, requestData, getOrder,
}) {
  const { disableDelivered, setDisableDelivered } = useContext(MyContext);
  const NEGATIVE_FOUR = -4;
  const DATE_CUT_LIMIT = 10;
  const [classBack, setClassBack] = useState(false);

  const putStatus = async (sta) => {
    await api('PUT', `/sales/${id}`, { status: sta })
      .then((info) => console.log(info.data));
  };

  const setStatusBackground = () => {
    if (status === 'Pendente') {
      setClassBack(styles.pending);
    } else if (status === 'Preparando') {
      setClassBack(styles.preparing);
    } else if (status === 'Em Trânsito') {
      setClassBack(styles.inTransit);
    } else {
      setClassBack(styles.delivered);
    }
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
    setStatusBackground();
  }, [getOrder, setDisableDelivered, status]);

  return (
    <section className={ styles.infoContainer }>
      <h4 id={ styles.numberItem }>
        <p>
          Pedido
        </p>
        {(`0000${id}`).slice(NEGATIVE_FOUR)}
      </h4>
      <h4 id={ styles.nameItem }>
        P. Vend:
        {' '}
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
        id={ styles.buttonItem }
        onClick={ () => putStatus('Entregue') }
        disabled={ disableDelivered }
      >
        Marcar como entregue
      </button>
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
