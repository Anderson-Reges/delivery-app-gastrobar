import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MyContext from '../../context/Context';
import api, { setToken } from '../../utils/fetch';
import styles from './styles.module.scss';

export default function Login() {
  const history = useHistory();
  const ifExistLoggedUser = JSON.parse(localStorage.getItem('user'));

  const {
    email, setemail,
    setPassword, password,
    setregister, register,
    disable, setDisable,
    isLoggedIn, setIsLoggedIn,
    Err, setErr,
    user, setUser,
  } = useContext(MyContext);

  const Red = async (event) => {
    event.preventDefault();
    setregister(true);
    setErr(false);
  };

  const postLogin = async (event) => {
    event.preventDefault();

    await api('POST', 'login', { email, password })
      .then((info) => {
        localStorage.setItem('user', JSON.stringify(info.data));
        setUser(info.data);
        setToken(info.data.token);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setErr(true);
      });
    setPassword('');
    setemail('');
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      switch (ifExistLoggedUser.role) {
      case 'customer':
        history.push('/customer/products');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        break;
      }
    }
    const minSizePass = 6;
    const emailVerify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailVerify.test(email) && password.length >= minSizePass) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [email, password, setDisable]);

  if (register) return <Redirect to="/register" />;

  if (isLoggedIn && user.role === 'administrator') {
    return <Redirect to="/admin/manage" />;
  }

  if (isLoggedIn && user.role === 'customer') {
    return <Redirect to="/customer/products" />;
  }
  if (isLoggedIn && user.role === 'seller') {
    return <Redirect to="/seller/orders" />;
  }

  return (
    <form action="post" onSubmit={ postLogin } className={ styles.formContainer }>
      <div className={ styles.loginBox }>
        <span className={ styles.loginLogo }>
          <ion-icon name="beer-outline" />
          <h2>GastroBar</h2>
          <h3>Delivery</h3>
        </span>
        <span className={ styles.loginInputs }>
          <label
            htmlFor="email"
          >
            <ion-icon name="log-in-outline" />
            <input
              type="email"
              id="email"
              value={ email }
              placeholder="Email"
              onChange={ ({ target }) => setemail(target.value) }
            />
          </label>
          <label
            htmlFor="password"
          >
            <ion-icon name="key-outline" />
            <input
              type="password"
              id="password"
              value={ password }
              placeholder="Senha"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
          <button
            type="submit"
            disabled={ disable }
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={ Red }
          >
            Cadastrar-se
          </button>
          {Err
            ? (
              <div className={ styles.errorBox }>
                <ion-icon name="warning-outline" />
                <p>Senha ou Email incorreto</p>
              </div>
            )
            : <div />}
        </span>
      </div>
    </form>
  );
}
