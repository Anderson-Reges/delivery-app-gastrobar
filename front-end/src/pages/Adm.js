import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import MyContext from '../context/Context';
import api from '../utils/fetch';
import Navbar from '../components/Navbar';

export default function Adm() {
  const {
    disable, setDisable,
    Err,
    role, setRole,
  } = useContext(MyContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    const minSizePass = 6;
    const minSizeUser = 12;
    const emailVerify = /^\S+@\S+\.\S+$/;
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
    await api('POST', 'admin/manage', { name: username, email, password, role });
  };

  return (
    <div>
      <Navbar />
      <h3>Cadastrar novo usuário</h3>
      <form>
        <label
          htmlFor="username"
        >
          Nome
          {' '}
        </label>
        <input
          data-testid="admin_manage__input-name"
          type="text"
          id="name"
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
          onChange={ (r) => setRole(r.target.value) }
        >
          <option value="seller" defaultValue>Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          onClick={ () => postAdm() }
          disabled={ disable }
        >
          Cadastrar
        </button>
        {Err
          ? <h1 data-testid="admin_manage__element-invalid-register">   Erro  </h1>
          : <div />}
      </form>
    </div>
  );
}
