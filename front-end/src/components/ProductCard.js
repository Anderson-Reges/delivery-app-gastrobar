import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/Context';

export default function ProductCard({ id, name, price, urlImage }) {
  const { setCartItens, cartItens } = useContext(MyContext);
  const [quantity, setQuantity] = useState(0);

  const updateCart = () => {
    const updatedProduct = {
      id,
      name,
      quantity,
      price: Number(price),
    };
    const cart = JSON.parse(localStorage.getItem('products'));
    setCartItens(cart);
    const updatedList = cartItens.filter((product) => product.id !== id);
    updatedList.push(updatedProduct);
    localStorage.setItem('products', JSON.stringify(updatedList));
    setCartItens(JSON.parse(localStorage.getItem('products')));
  };

  const setQuantitValue = ({ target }) => {
    if (target.value >= 0) setQuantity(Number(target.value));
  };

  const setProductQuantity = ({ target }) => {
    switch (target.value) {
    case '+':
      setQuantity(quantity + 1);
      break;
    case '-':
      if (quantity > 0) setQuantity(quantity - 1);
      break;
    default:
    }
  };

  useEffect(() => updateCart(), [quantity]);

  return (
    <div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="70px"
        height="70px"
      />
      <h2
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </h2>
      <h2
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        R$
        {' '}
        {price.toString().replace('.', ',')}

      </h2>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ setProductQuantity }
        type="button"
        value="-"
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        value={ quantity }
        onChange={ setQuantitValue }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ setProductQuantity }
        value="+"
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  price: PropTypes.shape({
    toString: PropTypes.func,
  }),
  urlImage: PropTypes.any,
}.isRequired;
