import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';

export default function Register() {
  const { username,
    setUsername,
    password,
    setPassword,
    loggin,
    setloggin,
    Err,
    setErr,
    email,
    setemail } = useContext(MyContext);

  useEffect(() => {
    setErr(false);
    setUsername('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(username);
    console.log(password);
    if (username === '' || password === '') return setErr(true);
    setloggin(true);
    setErr(false);
  };

  if (loggin) return <Redirect to="/" />;
  return (
    <form onSubmit={ handleSubmit }>
      <label
        htmlFor="username"
      >
        Nome de usuário:
        {' '}

      </label>
      <input
        data-testids="common_register__input-name"
        type="text"
        value={ username }
        placeholder="insira um nome de usuário"
        onChange={ ({ target }) => setUsername(target.value) }
      />
      <label
        htmlFor="email"
      >
        E-mail:
        {' '}

      </label>
      <input
        data-testids="common_register__input-email"
        type="email"
        value={ email }
        placeholder="insira um email"
        onChange={ ({ target }) => setemail(target.value) }
      />

      <label
        htmlFor="password"
      >
        Senha:
        {' '}

      </label>
      <input
        data-testids="common_register__input-password"
        type="password"
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testids=" common_register__button-register"
        type="submit"
      >
        Register

      </button>
      {Err
        ? <h1 data-testids="common_register__element-invalid_register">   Erro  </h1>
        : <div />}
    </form>
  );
}
