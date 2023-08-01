import React, { useState, useEffect } from "react";
import './Summary.css';
import { userPlaceOrder } from "../../servicesApi/CartApi";
import ConfirmPay from './ConfirmPay';
import { useNavigate } from 'react-router-dom';
import { fetchAddress } from "../../servicesApi/AddressApi";

const Summary = ({ orderData, cardDetails, location, paymentMethod, handlePrevious }) => {
  const { user, products, total_amount } = orderData;
  const { cardHolderName, cardNumber } = cardDetails;
  const { id, address, city, state, postal_code, country, phone_number } = location;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addresss, setAddresss] = useState({})
  const navigate = useNavigate();

  console.log(addresss);
  const productsID = products.map((product) => (product.product_id));
  const orderDataa = {
    user: orderData.user,
    products: orderData.products,
    cardDeatils: cardDetails,
    location: location
  };

  const orderrDataa = {
    user_id: orderData.user.id,
    products: productsID,
    total_amount: total_amount,
    address_id: addresss.id
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressData = await fetchAddress(user.id);
        if (addressData) {
          setAddresss(addressData);
        }
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };

    fetchData();
  }, [user.id]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePlaceOrder = async () => {
    try {
      await userPlaceOrder(orderrDataa);
      setOrderPlaced(true);
      toggleModal(); // Show the modal after placing the order
    } catch (error) {
      console.error("Error adding user address:", error);
    }
  };


  const navigateToHome = () => {
    toggleModal(); // Hide the modal
    navigate('/'); // Navigate to the home page
  };

  return (
    <>
      <div id="summary-container">
        <h2 className="summary-heading">Summary</h2>
        <div className='one-container'>
          <div className="user-details">
            <h3 className="summary-subheading">User Details</h3>
            <p className="summary-text">Name: {user.firstName} {user.lastName}</p>
            <p className="summary-text">Email: {user.email}</p>
          </div>

          <div className="credit-details">
            <h3 className="summary-subheading">Card Details</h3>
            <p className="summary-text">Card Holder Name: {cardHolderName}</p>
            <p className="summary-text">Card Number: {cardNumber}</p>
          </div>
        </div>

        <div className='two-container'>
          <div className="section-product-details">
            <div className="container">
              <div className="box">
                <h3 className="summary-subheading">Product Details</h3>
                <div className="menu-bar">
                  <div className="menu-item">Name</div>
                  <div className="menu-item">Price</div>
                </div>
                {products.map((product, index) => (
                  <div key={index} className="product-details">
                    {product.images.length > 0 && (
                      <img
                        className="product-image"
                        src={product.images[0].image_url}
                        alt={product.name}
                      />
                    )}
                    <p className="summary-text"> {product.name}</p>
                    <p className="summary-text"> ${product.price}</p>
                  </div>
                ))}
                <p className="total-price">Total Price: ${total_amount}</p>
              </div>
            </div>
          </div>
          <div className="location-details">
            <h3 className="summary-subheading">Location Details</h3>
            <p className="summary-text">Street: {address}</p>
            <p className="summary-text">City: {city}</p>
            <p className="summary-text">State: {state}</p>
            <p className="summary-text">Postal Code: {postal_code}</p>
            <p className="summary-text">Country: {country.value || country}</p>
            <p className="summary-text">Phone Number: {phone_number}</p>
          </div>
        </div>
        <div className="summary-buttons">
          <button className="summary-button" onClick={handlePrevious}>Previous</button>
          <button className="summary-button" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>

      {/* Conditionally render the ConfirmPay component as a modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ConfirmPay onClose={navigateToHome} />
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
