import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/fetch';
import MyContext from './Context';

function MeuProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Err, setErr] = useState('');
  const [disable, setDisable] = useState(true);

  const postLogin = async (email, password) => api('POST', 'login', { email, password })
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
    isLoggedIn,
    setIsLoggedIn,
    Err,
    setErr,
    postLogin,
    disable,
    setDisable,
  }), [isLoggedIn, Err, disable]);

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
