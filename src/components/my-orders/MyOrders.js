import React, { useState, useEffect } from 'react';
import './MyOrders.css';
import { fetchOrders } from "../../servicesApi/OrdersApi";
import { format } from 'date-fns';

export default function MyOrders({ user }) {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders(user.id);
      setMyOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  console.log(myOrders);


  return (
    <div className="my-orders-container">
      <h1 className="header">My Orders</h1>
      {myOrders.map((order) => (
        <div key={order.order_id} className="order">
          <h3>Order ID: {order.order_id}</h3>
          <span>Order Date: {format(new Date(order.order_date), 'yyyy-MM-dd')}</span>
          <br/><br/><br/><br/>
          <h3>Products:</h3>

          {order.items.map((item) => (
            <div key={item.item_id} className="order-item">
              <img src={item.product.product_image_url} alt={item.product.product_name} className="product-image" />
              <p>Name : {item.product.product_name}</p>
              <p>Price : {item.product.product_price}$</p>
              <p>Quantity : {item.quantity}</p>
            </div>
          ))}


          <h3>Location:</h3>
          <div className='order-address'>
            <p>Street : {order.address.address}</p> 
            <p>State : {order.address.state}</p>
            <p>City : {order.address.city}</p> 
            <p>Country : {order.address.country}</p> 
            <p>PostalCode : {order.address.postal_code}</p>  
            <p>Phone Number : +{order.address.phone_number}</p>  
          </div>
          
        </div>
      ))}
    </div>
  );
}
