import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect, useHistory } from 'react-router-dom';
import MyContext from '../context/Context';
import api from '../utils/fetch';

export default function Login() {
  const {
    email, setemail,
    setPassword, password,
    setregister, register,
    disable, setDisable,
    setIsLoggedIn,
    Err, setErr,
  } = useContext(MyContext);

  const history = useHistory();

  const Red = async (event) => {
    event.preventDefault();
    setregister(true);
  };

  const postLogin = async (event) => {
    event.preventDefault();

    await api('POST', 'login', { email, password })
      .then((info) => {
        localStorage.setItem('user', JSON.stringify(info.data));
        setToken(info.data.token);
        setIsLoggedIn(true);
        if (info.data.role === 'customer') { return history.push('/customer/products'); }
        if (info.data.role === 'administrator') { return history.push('/admin/manage'); }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setErr(true);
      });
  };

  useEffect(() => {
    const minSizePass = 6;
    const emailVerify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailVerify.test(email) && password.length >= minSizePass) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [email, password, setDisable]);

  if (register) return <Redirect to="/register" />;

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
