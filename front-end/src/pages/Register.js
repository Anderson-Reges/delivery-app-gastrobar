import React, { useContext, useEffect } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';
import validateRegister from '../validation/register.validation';

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
    // setUsername('');
    // setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erro = validateRegister(username, password, email);
    if (erro) {
      return setErr(true); // se encontrar um erro ele avisa a tela que tem um erro.
    }
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
        data-testid="common_register__input-name"
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
        data-testid="common_register__input-email"
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
        data-testid="common_register__input-password"
        type="password"
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />

      <button
        data-testid=" common_register__button-register"
        type="submit"
      >
        Register

      </button>
      {Err
        ? <h1 data-testid="common_register__element-invalid_register">   Erro  </h1>
        : <div />}
    </form>
  );
}
