import React, { useContext } from 'react';
import MyContext from '../context/Context';

export default function FormAdmin() {
  const {
    disable,
    Err, setRole,
    setUsername, setPassword,
    setemail, role,
  } = useContext(MyContext);

  return (
    <>
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
        value={ role }
        name="role"
        data-testid="admin_manage__select-role"
        id="tipo"
        onChange={ (r) => setRole(r.target.value) }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
        <option value="administrator">Administrator</option>
      </select>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        disabled={ disable }
      >
        Cadastrar
      </button>
      {Err
        ? <h1 data-testid="admin_manage__element-invalid-register">   Erro  </h1>
        : <div />}
    </>
  );
}
