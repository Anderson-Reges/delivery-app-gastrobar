import React, { useContext } from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';
import api from '../utils/fetch';

export default function Adm() {
  const {
    username, setUsername,
    password, setPassword,
    loggin, setIsLoggedIn,
    Err, setErr,
    email, setemail,
    disable,
  } = useContext(MyContext);

  const postLogin = async (event) => {
    event.preventDefault();
    await api('POST', 'login', { email, password })
      .then((info) => {
        localStorage.setItem('user', JSON.stringify(info.data));
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setErr(true);
      });
  };

  if (loggin) return <Redirect to="/admin/manage" />;
  return (
    <form onSubmit={ postLogin }>
      <label
        htmlFor="username"
      >
        Nome
        {' '}
      </label>
      <input
        data-testid="admin_mange__input-name"
        type="text"
        id="name"
        value={ username }
        placeholder="Nome e sobrenome"
        onChange={ ({ target }) => setUsername(target.value) }
      />
      <label
        htmlFor="email"
      >
        Email
        {' '}
      </label>
      <input
        data-testid="admin_manage__input-email"
        type="email"
        id="email"
        value={ email }
        placeholder="insira um email"
        onChange={ ({ target }) => setemail(target.value) }
      />
      <label
        htmlFor="password"
      >
        Senha
        {' '}
      </label>
      <input
        data-testid="admin_manage__input-password"
        type="password"
        id="password"
        value={ password }
        placeholder="insira uma senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <label
        htmlFor="tipo"
      >
        Tipo
        {' '}
      </label>
      <select
        data-testid="admin_manage__select-role"
        id="tipo"
      >
        <option>Vendedor</option>
        <option>Cliente</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        disabled={ disable }
      >
        Register
      </button>
      {Err
        ? <h1 data-testid="admin_manage__element-invalid-register">   Erro  </h1>
        : <div />}
    </form>
  );
}
