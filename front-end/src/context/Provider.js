import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function MeuProvider({ children }) {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggin, setloggin] = useState(false);
  const [register, setregister] = useState(false);
  const [Err, setErr] = useState(false);

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
  }), [username, password, Err, register, email, loggin]);

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
