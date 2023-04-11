import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MyContext from '../context/Context';
import api from '../utils/fetch';
import OrderTable from '../components/OrderTable';
import SellerDetailsOrder from '../components/SellerDetailsOrder';

export default function SellerOrderDetails() {
  const { order, setOrder } = useContext(MyContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getOrder = async () => {
    await api('GET', `sales/${id}`)
      .then((info) => {
        setOrder(info.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <section>
      <Navbar />
      Detalhe do Pedido
      {loading ? (<h2>Carregando...</h2>) : (
        <main>
          <SellerDetailsOrder
            id={ order.sale.id }
            name={ order.seller.name }
            status={ order.sale.status }
            totalPrice={ order.sale.totalPrice }
            requestData={ order.sale.saleDate }
            getOrder={ getOrder }
          />
          <OrderTable
            order={ order.sale.products }
          />
        </main>
      )}
    </section>
  );
}

SellerOrderDetails.propTypes = {
  id: PropTypes.any,
}.isRequired;
