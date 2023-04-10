import PropTypes from 'prop-types';
import React from 'react';

export default function OrderTable({ order }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitario</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {order && order.map((product, index) => (
          <tr key={ product.id }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-${index}` }
            >
              {product.name}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              {product.SaleProduct.quantity}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${index}`
              }
            >
              R$
              {Number(product.price).toFixed(2).toString().replace('.', ',')}
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              R$
              {
                Number(product.price * product.SaleProduct.quantity)
                  .toFixed(2).toString().replace('.', ',')
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  order: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
