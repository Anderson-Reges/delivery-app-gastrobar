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
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState(0);
  const [isAdm, setIsAdm] = useState(false);
  const [role, setRole] = useState('');
  const [disablePreparing, setDisablePreparing] = useState(false);
  const [disableDelivery, setDisableDelivery] = useState(true);
  const [disableDelivered, setDisableDelivered] = useState(false);

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
    orders,
    setOrders,
    order,
    setOrder,
    orderId,
    setOrderId,
    isAdm,
    setIsAdm,
    role,
    setRole,
    disableDelivery,
    setDisableDelivery,
    disablePreparing,
    setDisablePreparing,
    disableDelivered,
    setDisableDelivered,
  }), [
    isLoggedIn, loggin,
    Err, disable,
    register, email,
    password, username,
    loggedUser, products,
    cartItens, sellers,
    totalPrice, address,
    houseNumber, selectSeller,
    user, orders,
    order, orderId,
    isAdm, role,
    disableDelivery, disablePreparing,
    disableDelivered,
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
