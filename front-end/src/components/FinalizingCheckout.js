import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../utils/fetch';
import MyContext from '../context/Context';

export default function FinalizingCheckout({ sellers, cartItens }) {
  const {
    address, setAddress, houseNumber, setHouseNumber, selectSeller, setSelectSeller,
    user, setUser,
  } = useContext(MyContext);

  const history = useHistory();
  const total = cartItens
    .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await api('POST', 'sales', {
      userId: user.id,
      deliveryAddress: address,
      deliveryNumber: houseNumber,
      sellerId: selectSeller,
      totalPrice: total,
      cartItens,
    }, user.token);
    history.push(`/customer/orders/${result.data.id}`);
  };

  useEffect(() => {
    if (sellers.length > 0) {
      setSelectSeller(sellers[0].id);
    }
    setUser(JSON.parse(localStorage.getItem('user')));
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
