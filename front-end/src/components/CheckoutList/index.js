import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import MyContext from '../../context/Context';
import styles from './styles.module.scss';

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
    <section className={ styles.checkoutListContainer }>
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th id={ styles.item }>Item</th>
            <th id={ styles.nameTh }>Descrição</th>
            <th id={ styles.quantityTh }>Quantidade</th>
            <th id={ styles.priceTh }>Valor Unitario</th>
            <th id={ styles.pricePerQuantityTh }>Sub-total</th>
            <th id={ styles.removeButtonTh }>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItens && cartItens.map((product, index) => (
            <tr key={ product.id }>
              <td id={ styles.numberItem }>
                {index + 1}
              </td>
              <td id={ styles.nameItem }>
                {product.name}
              </td>
              <td id={ styles.quantityItem }>
                {product.quantity}
              </td>
              <td id={ styles.priceItem }>
                R$
                {Number(product.price).toFixed(2).toString().replace('.', ',')}
              </td>
              <td id={ styles.pricePerQuantity }>
                R$
                {
                  Number(product.price * product.quantity)
                    .toFixed(2).toString().replace('.', ',')
                }
              </td>
              <td id={ styles.removeButton }>
                <input
                  type="button"
                  value="Remover"
                  onClick={ () => removeItemInCart(product.id) }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <h2 className={ styles.totalPrice }>
          Total: R$
          {' '}
          {totalPrice.toFixed(2).toString().replace('.', ',')}
        </h2>
      </table>
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
