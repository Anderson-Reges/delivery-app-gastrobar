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
          <div key={ product.id }>
            <img src={ product.urlImage } alt="" />
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
            <input
              type="button"
              value="-"
              onClick={ () => decreaseItem(product.id) }
            />
            <h2>
              {
                cartItens.find(({ id }) => id === product.id)
                  ? cartItens.find(({ id }) => id === product.id).quantity
                  : 0
              }
            </h2>
            <input
              type="button"
              value="+"
              onClick={ () => addItem(product.id) }
            />
          </div>
        ))}
      </div>
    </main>
  );
}
