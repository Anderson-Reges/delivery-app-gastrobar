import React, { useContext } from 'react';
import '../App.css';
import MyContext from '../context/Context';

export default function Adm() {
  const {
    username, setUsername,
    password, setPassword,
    email, setemail,
    disable,
    Err, setRole,
  } = useContext(MyContext);

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
        onChange={ ({ target }) => setRole(target.value) }
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
