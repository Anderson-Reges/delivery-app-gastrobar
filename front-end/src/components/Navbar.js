import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/Context';

export default function Navbar() {
  const { loggerUser, setLoggedUser } = useContext(MyContext);

  const removeLoggedUser = () => {
    localStorage.removeItem('user');
  };

  useEffect(() => setLoggedUser(JSON.parse(localStorage.getItem('user'))));

  return (
    <header>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      </div>
      <div>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {loggerUser.name}
        </span>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ removeLoggedUser }
        >
          Sair
        </Link>
      </div>
    </header>
  );
}
