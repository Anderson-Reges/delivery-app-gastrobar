import PropTypes from 'prop-types';
import React from 'react';

export default function FinalizingCheckout({ sellers }) {
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
          >
            {sellers && sellers.map(({ name, id }) => (
              <option
                key={ id }
                value={ name }
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
          />
        </label>
        <label htmlFor="Numero">
          Numero
          <input
            type="number"
            id="Numero"
            data-testid="customer_checkout__input-address-number"
          />
        </label>
      </form>
      <input
        type="submit"
        value="Finalizar Pedido"
        data-testid="customer_checkout__button-submit-order"
      />
    </section>
  );
}

FinalizingCheckout.propTypes = {
  sellers: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
