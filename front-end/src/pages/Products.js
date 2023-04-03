import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MyContext from '../context/Context';
import api from '../utils/fetch';

export default function Products() {
  const {
    products, setProducts,
    cartItens, setCartItens,
  } = useContext(MyContext);

  const cartProducts = () => {
    const getItens = localStorage.getItem('products');
    const itens = JSON.parse(getItens);
    setCartItens(itens);
  };

  const addItem = (productId) => {
    const item = products.find(({ id }) => id === productId);
    const inCart = cartItens.find(({ id }) => id === productId);
    if (inCart) {
      inCart.quantity += 1;
      localStorage.setItem('products', JSON.stringify(cartItens));
      cartProducts();
    } else {
      if (!item.quantity) item.quantity = 0;
      item.quantity += 1;
      cartItens.push(item);
      localStorage.setItem('products', JSON.stringify(cartItens));
      cartProducts();
    }
  };

  const decreaseItem = (productId) => {
    const item = cartItens.find(({ id }) => id === productId);
    if (item.quantity <= 1) {
      item.quantity = 0;
    } else {
      item.quantity -= 1;
    }
    // if (item.quantity === 0) {
    //   cartItens.splice(cartItens.indexOf(item), 1);
    //   localStorage.setItem('products', JSON.stringify(cartItens));
    //   cartProducts();
    // }
    localStorage.setItem('products', JSON.stringify(cartItens));
    cartProducts();
  };

  const getRout = (e) => {
    e.preventDefault();
    window.location.href = '/customer/checkout';
  };

  const getProducts = async () => {
    await api('GET', 'products')
      .then((info) => setProducts(info.data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main>
      <Navbar />
      <div>
        {products && products.map((product) => (
          <div
            key={ product.id }
          >
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.urlImage }
              alt={ product.name }
              width="70px"
              height="70px"
            />
            <h2
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}

            </h2>
            <h2
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              R$
              {' '}
              {product.price.toString().replace('.', ',')}

            </h2>
            <button
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onClick={ () => decreaseItem(product.id) }
              type="button"
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              value={ cartItens.find(({ id }) => id === product.id)
                ? cartItens.find(({ id }) => id === product.id).quantity
                : 0 }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              onClick={ () => addItem(product.id) }
            >
              +
            </button>
          </div>
        ))}
        <button
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ (e) => getRout(e) }
          value="customer_products__checkout-bottom-value"
        >
          Checkout
          {' '}

        </button>
      </div>
    </main>
  );
}
