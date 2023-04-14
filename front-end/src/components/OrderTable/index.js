import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';

export default function OrderTable({ order, totalPrice }) {
  return (
    <table className={ styles.table }>
      <thead>
        <tr>
          <th id={ styles.item }>Item</th>
          <th id={ styles.nameTh }>Descrição</th>
          <th id={ styles.quantityTh }>Quantidade</th>
          <th id={ styles.priceTh }>Valor Unitario</th>
          <th id={ styles.pricePerQuantityTh }>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {order && order.map((product, index) => (
          <tr key={ product.id }>
            <td id={ styles.numberItem }>
              {index + 1}
            </td>
            <td id={ styles.nameItem }>
              {product.name}
            </td>
            <td id={ styles.quantityItem }>
              {product.SaleProduct.quantity}
            </td>
            <td id={ styles.priceItem }>
              R$
              {Number(product.price).toFixed(2).toString().replace('.', ',')}
            </td>
            <td id={ styles.pricePerQuantity }>
              R$
              {
                Number(product.price * product.SaleProduct.quantity)
                  .toFixed(2).toString().replace('.', ',')
              }
            </td>
          </tr>
        ))}
      </tbody>
      <h2 className={ styles.totalPrice }>
        Total: R$
        {totalPrice.replace('.', ',')}
      </h2>
    </table>
  );
}

OrderTable.propTypes = {
  order: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
