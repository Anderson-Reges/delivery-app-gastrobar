import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/Context';

export default function CheckoutList({ cartItens, getProducts }) {
  const { totalPrice, setTotalPrice } = useContext(MyContext);

  const removeItemInCart = (id) => {
    const remove = cartItens.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(remove));
    getProducts();
  };

  useEffect(() => {
    const total = cartItens
      .reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    setTotalPrice(total);
  }, [removeItemInCart]);

  return (
    <section>
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitario</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItens && cartItens.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {product.quantity}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                R$
                {Number(product.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                R$
                {
                  Number(product.price * product.quantity)
                    .toFixed(2).toString().replace('.', ',')
                }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-remove-${index}`
                }
              >
                <input
                  type="button"
                  value="Remover"
                  onClick={ () => removeItemInCart(product.id) }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        {totalPrice.toFixed(2).toString().replace('.', ',')}
      </h2>
    </section>
  );
}

CheckoutList.propTypes = {
  cartItens: PropTypes.shape({
    forEach: PropTypes.func,
    map: PropTypes.func,
    splice: PropTypes.func,
  }),
}.isRequired;
