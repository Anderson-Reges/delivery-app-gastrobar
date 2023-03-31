import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';

export default function Login() {
  const {
    email,
    setemail,
    setPassword,
    password,
    setregister,
    register,
    disable,
    setDisable,
    postLogin,
    isLoggedIn,
    Err,
  } = useContext(MyContext);

  const Red = async (e) => {
    e.preventDefault();
    setregister(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postLogin();
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
  if (isLoggedIn) return <Redirect to="/customer/products" />;

  return (
    <form>

      <label
        htmlFor="username"
      >
        Nome de usuário:
        {' '}

      </label>
      <input
        data-testid="common_login__input-email"
        type="text"
        value={ email }
        placeholder="insira um nome de usuário"
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
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ disable }
        onClick={ handleSubmit }
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
