import React, { useContext } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';

export default function Login() {
  const { username,
    setUsername,
    password,
    setPassword,
    isLoggedIn, setIsLoggedIn,
    Err,
    setErr,
    register,
    setregister } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(username);
    console.log(password);
    if (username === '' || password === '') {
      console.log('erro');
      return setErr(true);
    }
    setErr(false);
    setIsLoggedIn(true);
  };
  const Red = async (e) => {
    e.preventDefault();
    console.log('register');
    setregister(true);
  };

  if (isLoggedIn) {
    <div>
      { user.username }
      {' '}
      está logado!!
    </div>;
  }
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
        data-testids="common_login__input-email"
        type="text"
        value={ username }
        placeholder="insira um nome de usuário"
        onChange={ ({ target }) => setUsername(target.value) }
      />

      <label
        htmlFor="password"
      >
        Senha:
        {' '}

      </label>
      <input
        data-testids="common_login__input-password"
        type="password"
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testids="common_login__button-login"
        type="submit"
      >
        Login

      </button>
      <button
        data-testids="common_login__button-register"
        type="button"
        onClick={ Red }
      >
        Register

      </button>
      {Err
        ? <h1 data-testids="common_login__element-invalid-email">   Erro  </h1>
        : <div />}
    </form>
  );
}
