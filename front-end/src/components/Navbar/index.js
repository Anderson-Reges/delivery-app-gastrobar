import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../../context/Context';
import styles from './styles.module.scss';

export default function Navbar() {
  const { loggedUser, setLoggedUser } = useContext(MyContext);
  const removeLoggedUser = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    window.location.href = '/';
  };

  useEffect(() => setLoggedUser(JSON.parse(localStorage.getItem('user'))), []);

  const renderByRole = () => {
    switch (loggedUser.role) {
    case 'administrator':
      return (
        <div className={ styles.navLinks }>
          <Link
            to="/"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar Usuarios
          </Link>
        </div>
      );
    case 'seller':
      return (
        <div className={ styles.navLinks }>
          <Link
            to="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Pedidos
          </Link>
        </div>
      );
    case 'customer':
      return (
        <div className={ styles.navLinks }>
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
      );
    default:
      break;
    }
  };

  return (
    <header>
      <span className={ styles.HeaderLogo }>
        <ion-icon name="beer-outline" />
        <div>
          <h2>GastroBar</h2>
          <h3>Delivery</h3>
        </div>
      </span>
      {renderByRole()}
      <div className={ styles.userBox }>
        <span>
          {loggedUser && loggedUser.name}
        </span>
        <a
          href="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ removeLoggedUser }
        >
          <ion-icon name="log-out-outline" />
        </a>
      </div>
    </header>
  );
}
