/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import MyContext from '../../context/Context';
import api from '../../utils/fetch';
import Navbar from '../../components/Navbar';
import ListUsers from '../../components/ListUsers';
import styles from './styles.module.scss';

export default function Adm() {
  const {
    disable, setDisable,
    setErr, Err,
    role, setRole,
    username, setUsername,
    password, setPassword,
    email, setemail,
  } = useContext(MyContext);

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
    await api('POST', 'admin/manage', { name: username, email, password, role })
      .catch(() => {
        setErr(true);
      });
  };

  return (
    <div>
      <Navbar />
      <span className={ styles.pageContainer }>
        <main className={ styles.main }>
          <h3 id={ styles.titleNewUser }>Cadastrar novo usuário</h3>
          <form onSubmit={ postAdm } className={ styles.formContainer }>
            <label
              htmlFor="username"
            >
              Nome
              {' '}
              <input
                type="text"
                id="name"
                placeholder="Nome e sobrenome"
                onChange={ ({ target }) => setUsername(target.value) }
              />
            </label>
            <label
              htmlFor="email"
            >
              Email
              {' '}
              <input
                type="email"
                id="email"
                placeholder="insira um email"
                onChange={ ({ target }) => setemail(target.value) }
              />
            </label>
            <label
              htmlFor="password"
            >
              Senha
              {' '}
              <input
                type="password"
                id="password"
                placeholder="insira uma senha"
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </label>
            <label
              htmlFor="tipo"
            >
              Tipo
              {' '}
              <select
                value={ role }
                name="role"
                id="tipo"
                onChange={ (r) => setRole(r.target.value) }
              >
                <option value="seller">Vendedor</option>
                <option value="customer">Cliente</option>
                <option value="administrator">Administrator</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={ disable }
            >
              Cadastrar
            </button>
          </form>
          {Err
            ? (
              <div className={ styles.errorBox }>
                <ion-icon name="warning-outline" />
                <p>Email ou Username já existente</p>
              </div>
            )
            : <div />}
        </main>
        <main className={ styles.main }>
          <h3 id={ styles.titleUser }>Lista de usuários</h3>
          <ListUsers />
        </main>
      </span>
    </div>
  );
}
