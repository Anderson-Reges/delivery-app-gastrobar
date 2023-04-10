import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MyContext from '../context/Context';
import api from '../utils/fetch';
import OrderTable from '../components/OrderTable';
import DetailsOrder from '../components/DetailsOrder';

export default function OrderDetails() {
  const { order, setOrder } = useContext(MyContext);
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      await api('GET', `sales/${pathname.slice(pathname.length - 1)}`)
        .then((info) => {
          setOrder(info.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getOrder();
  }, []);
  return (
    <section>
      <Navbar />
      Detalhe do Pedido
      {loading ? (<h2>Carregando...</h2>) : (
        <main>
          <DetailsOrder
            name={ order.seller.name }
            status={ order.sale.status }
            totalPrice={ order.sale.totalPrice }
            requestData={ order.sale.saleDate }
          />
          <OrderTable
            order={ order.sale.products }
          />
        </main>
      )}
    </section>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.any,
}.isRequired;
