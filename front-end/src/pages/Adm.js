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
    role, setRole,
  } = useContext(MyContext);

  useEffect(() => {
    const doze = 12;
    const nomeOk = username.length >= doze;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const emailOk = regex.test(email);
    const seis = 6;
    const passwordOk = password.length > seis;
    const tudoOk = nomeOk && passwordOk && emailOk;
    if (tudoOk) return setDisable(false);
    return setDisable(true);
  }, [email, password, setDisable, username]);

  const postAdm = async (event) => {
    event.preventDefault();
    await api('POST', 'admin/manage', { name: username, email, password, role })
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
    <div>
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
