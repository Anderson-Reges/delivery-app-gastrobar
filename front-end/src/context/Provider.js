import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/fetch';
import MyContext from './Context';

function MeuProvider({ children }) {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggin, setloggin] = useState(false);
  const [register, setregister] = useState(false);
  const [Err, setErr] = useState('');
  const [disable, setDisable] = useState(true);

  const postLogin = async () => api('POST', 'login', { email, password })
    .then((info) => {
      localStorage.setItem('user', JSON.stringify(info.data));
      setIsLoggedIn(true);
    })
    .catch(() => {
      setIsLoggedIn(false);
      setErr(true);
    });

  // const postRegister = async (newUser) => api('POST', 'register', newUser)
  //   .then((info) => );

  const contextValue = useMemo(() => ({
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
    Err,
    setErr,
    register,
    setregister,
    email,
    setemail,
    loggin,
    setloggin,
    postLogin,
    disable,
    setDisable,
  }), [username, password, Err, register, email, loggin, isLoggedIn]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MeuProvider.propTypes = {
  children: PropTypes.arrayOf().isRequired,

};
export default MeuProvider;
