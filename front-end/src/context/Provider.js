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
  const [products, setProducts] = useState([]);
  const [cartItens, setCartItens] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [selectSeller, setSelectSeller] = useState(null);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');

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
    products,
    setProducts,
    cartItens,
    setCartItens,
    sellers,
    setSellers,
    totalPrice,
    setTotalPrice,
    address,
    setAddress,
    houseNumber,
    setHouseNumber,
    selectSeller,
    setSelectSeller,
    user,
    setUser,
    role,
    setRole,
  }), [
    isLoggedIn, loggin,
    Err, disable,
    register, email,
    password, username,
    loggedUser, products,
    cartItens, sellers,
    totalPrice, address,
    houseNumber, selectSeller,
    user, role,
  ]);

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
