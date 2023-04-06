import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/fetch';

export default function SellerOrders() {
  const [orderList, SetOrderList] = useState([]);

  const getSellerOrders = async () => {
    await api('GET', 'sales/')
      .then((res) => SetOrderList(res.data));
  };

  useEffect(() => {
    getSellerOrders();
  }, []);
  return (
    <main>
      <Navbar />
      <div>
        {orderList && orderList.map(({
          id,
          deliveryAddress,
          deliveryNumber,
          saleDate,
          status,
          totalPrice,
        }) => (
          <Link
            key={ id }
            to={ `/seller/orders/${id} ` }
          >
            <div
              className="card"
            >

              <h1
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                {id}

              </h1>
              <p
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                {status}

              </p>
              <p
                data-testid={ `seller_orders__element-order-date-${id}` }
              >
                {saleDate}

              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${id}` }
              >
                {`R$ ${totalPrice.replace('.', ',')}`}

              </p>
              <p
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                {`Endereço: ${deliveryAddress}, ${deliveryNumber}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}