import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect,
  useHistory,
} from 'react-router-dom';
import MyContext from '../context/Context';
import api, { setToken } from '../utils/fetch';

export default function Login() {
  const history = useHistory();

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
  };

  useEffect(() => {
    if (localStorage.getItem('user')) history.push('/customer/products');
    const minSizePass = 6;
    const emailVerify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailVerify.test(email) && password.length >= minSizePass) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [email, password, setDisable]);

  if (register) return <Redirect to="/register" />;

  if (isLoggedIn && user.role === 'customer') {
    return <Redirect to="/customer/products" />;
  }
  if (isLoggedIn && user.role === 'seller') {
    return <Redirect to="/seller/orders" />;
  }

  return (
    <form action="post" onSubmit={ postLogin }>

      <label
        htmlFor="email"
      >
        Email:
        {' '}

      </label>
      <input
        data-testid="common_login__input-email"
        type="email"
        id="email"
        value={ email }
        placeholder="insira um Email"
        onChange={ ({ target }) => setemail(target.value) }
      />

      <label
        htmlFor="password"
      >
        Senha:
        {' '}

      </label>
      <input
        data-testid="common_login__input-password"
        type="password"
        id="password"
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ disable }
      >
        Login

      </button>
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ Red }
      >
        Register
      </button>
      {Err
        ? <h1 data-testid="common_login__element-invalid-email">   Erro  </h1>
        : <div />}
    </form>
  );
}
