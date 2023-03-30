import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';

export default function Login() {
  const {
    password,
    setPassword,
    isLoggedIn,
    Err,
    register,
    setregister,
    postLogin,
    email,
    setemail,
    disable,
    setDisable,
  } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postLogin();
  };

  const Red = async (e) => {
    e.preventDefault();
    console.log('register');
    setregister(true);
  };

  const validateLogin = (Email, Password) => {
    const minSizePass = 5;
    const emailVerify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Email);
    if (Email === '' || Password === '') {
      return setDisable(true);
    }
    if (Password.length < minSizePass) {
      return setDisable(true);
    }
    if (!emailVerify) {
      return setDisable(true);
    }
    setDisable(false);
  };

  useEffect(() => {
    validateLogin(email, password);
  }, [email, password, setDisable, validateLogin]);

  if (register) return <Redirect to="/register" />;
  if (isLoggedIn) return <Redirect to="/home" />;

  return (
    <form onSubmit={ handleSubmit }>

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
