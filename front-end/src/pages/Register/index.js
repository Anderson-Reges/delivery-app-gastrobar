import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../../context/Context';
import api, { setToken } from '../../utils/fetch';
import styles from './styles.module.scss';

export default function Register() {
  const {
    username, setUsername,
    password, setPassword,
    loggin, setloggin,
    Err, setErr,
    email, setemail,
    disable, setDisable,
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

  const postRegister = async (event) => {
    event.preventDefault();
    await api('POST', 'register', { name: username, email, password })
      .then((info) => {
        localStorage.setItem('user', JSON.stringify(info.data));
        setToken(info.data.token);
        setloggin(true);
      })
      .catch(() => {
        setloggin(false);
        setErr(true);
      });
  };

  if (loggin) return <Redirect to="/customer/products" />;
  return (
    <form onSubmit={ postRegister } className={ styles.formContainer }>
      <span className={ styles.registerBox }>
        <span className={ styles.registerLogo }>
          <ion-icon name="beer-outline" />
          <h2>GastroBar</h2>
          <h3>Delivery</h3>
        </span>
        <span className={ styles.registerInputs }>
          <label
            htmlFor="username"
          >
            <ion-icon name="person-outline" />
            <input
              type="text"
              id="username"
              value={ username }
              placeholder="insira um nome de usuário"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </label>
          <label
            htmlFor="email"
          >
            <ion-icon name="mail-outline" />
            <input
              type="email"
              id="email"
              value={ email }
              placeholder="insira um email"
              onChange={ ({ target }) => setemail(target.value) }
            />
          </label>
          <label
            htmlFor="password"
          >
            <ion-icon name="key-outline" />
            <input
              type="password"
              id="password"
              value={ password }
              placeholder="insira uma senha"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
          <button
            type="submit"
            disabled={ disable }
          >
            Cadastrar-se
          </button>
          {Err
            ? (
              <div className={ styles.errorBox }>
                <ion-icon name="warning-outline" />
                <p>Nome ou email já existente</p>
              </div>
            )
            : <div />}
        </span>
      </span>
    </form>
  );
}
