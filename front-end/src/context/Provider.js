import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function MeuProvider({ children }) {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setregister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggin, setloggin] = useState(false);
  const [Err, setErr] = useState('');
  const [disable, setDisable] = useState(true);
  const [loggedUser, setLoggedUser] = useState('');

  const contextValue = useMemo(() => ({
    isLoggedIn,
    setIsLoggedIn,
    loggin,
    setloggin,
    Err,
    setErr,
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
    loggedUser,
    setLoggedUser,
  }), [
    isLoggedIn, loggin,
    Err, disable,
    register, email,
    password, username,
    loggedUser]);

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
