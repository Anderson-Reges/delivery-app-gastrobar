import React, { useContext, useEffect } from 'react';
import '../App.css';
import MyContext from '../context/Context';

export default function Adm() {
  const {
    username, setUsername,
    password, setPassword,
    email, setemail,
    disable, setDisable,
    Err,
  } = useContext(MyContext);

  useEffect(() => {
    const minSizePass = 6;
    const minSizeUser = 12;
    const emailVerify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (
      emailVerify.test(email)
      && password.length >= minSizePass
      && username.length >= minSizeUser) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [email, password, setDisable, username]);

  const postAdm = async (event) => {
    event.preventDefault();
    await api('POST', 'admin/manage', { name: username, email, password })
      .then((info) => {
        localStorage.setItem('user', JSON.stringify(info.data));
        setloggin(true);
      })
      .catch(() => {
        setloggin(false);
        setErr(true);
      });
  };

  return (
    <form onSubmit={ postAdm }>
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
        <option>Administrador</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        onClick={ () => postRegister }
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
