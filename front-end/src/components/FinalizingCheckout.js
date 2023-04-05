import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/fetch';

export default function FinalizingCheckout({ sellers, cartItens }) {
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [selectSeller, setSelectSeller] = useState(null);
  const history = useHistory();
  const total = cartItens
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await api('POST', 'sales', {
      userId: 3, // Quando corrigir a API, apagar essa linha, o userId não deveria ser passado aqui
      deliveryAddress: address,
      deliveryNumber: houseNumber,
      sallerId: selectSeller,
      totalPrice: total,
    });
    history.push(`/customer/orders/${result.data.id}`);
  };

  useEffect(() => {
    if (sellers.length > 0) {
      setSelectSeller(sellers[0].id);
    }
  }, [sellers]);

  return (
    <section>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form>
        <label htmlFor="Pessoa Vendendora">
          P.Vendendora Responsável:
          <select
            name="Pessoa Vendendora"
            id="Pessoa Vendendora"
            data-testid="customer_checkout__select-seller"
            value={ selectSeller }
            onChange={ ({ target }) => setSelectSeller(target.value) }
          >
            {sellers && sellers.map(({ name, id }) => (
              <option
                key={ id }
                value={ id }
              >
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="Endereço">
          Endereço
          <input
            type="text"
            id="Endereço"
            data-testid="customer_checkout__input-address"
            value={ address }
            onChange={ ({ target }) => setAddress(target.value) }
          />
        </label>
        <label htmlFor="Numero">
          Numero
          <input
            type="number"
            id="Numero"
            value={ houseNumber }
            onChange={ ({ target }) => setHouseNumber(target.value) }
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </form>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ onSubmit }
      >
        Finalizar Pedido
      </button>
    </section>
  );
}

FinalizingCheckout.propTypes = {
  sellers: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
