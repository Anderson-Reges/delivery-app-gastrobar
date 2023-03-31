import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/fetch';
import MyContext from './Context';

function MeuProvider({ children }) {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setregister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Err, setErr] = useState('');
  const [disable, setDisable] = useState(true);

  const postLogin = async () => api('POST', 'login', { email, password })
    .then((info) => {
      localStorage.setItem('user', JSON.stringify(info.data));
      setIsLoggedIn(true);
    })
    .catch(() => {
      setIsLoggedIn(false);
      console.log('entrei');
      setErr(true);
    });

  // const postRegister = async (newUser) => api('POST', 'register', newUser)
  //   .then((info) => );

  const contextValue = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn,
    Err,
    setErr,
    postLogin,
    disable,
    setDisable,
    register,
    setregister,
    email,
    setemail,
    setPassword,
    password,
    username,
    setUsername,
  }), [isLoggedIn, Err, disable, register, email, password, username]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MeuProvider.propTypes = {
  children: PropTypes.arrayOf(),

}.isRequired;
export default MeuProvider;
