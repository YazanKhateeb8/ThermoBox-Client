import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './paymentMethod.css';

export default function PaymentMethod({ setPaymentMethod, handlePrevious }) {

  const [paymentMethodd, setPaymentMethodd] = useState('');

  const handlePaymentMethodChange = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
    setPaymentMethodd(paymentMethod)
    console.log(paymentMethod);
  };

  return (
    <>
          <div id="payment-method">
        <h2>How would you like to pay?</h2>
        <button
          className="payment-method-button"
          onClick={() => handlePaymentMethodChange('paypal')}
        >
          <PayPalScriptProvider options={{ "client-id": "AXhfjjk2DT06Ky9HHCWYuwMAfM2m4Lo-wYby5t3gqFDRYbK9a9fLNyJF8R5AtKP6LMlFFvsK103nyOXp" }}>
            <PayPalButtons style={{ layout: 'horizontal' }} />
          </PayPalScriptProvider>
        </button>

        <button
          className="payment-method-button"
          onClick={() => handlePaymentMethodChange('creditCard')}
        >
          Credit Card
        </button>
      </div>

      <div className="handel-step">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
      </div>

    </>
  );
}



// {paymentMethodd === 'paypal' && (
//   <PayPalScriptProvider options={{ /* PayPal SDK options */ }}>
//     <PayPalButtons
//       createOrder={(data, actions) => {
//         // Logic to create the order with PayPal
//       }}
//       onApprove={(data, actions) => {
//         // Logic to handle a successful payment
//       }}
//       onError={(err) => {
//         // Logic to handle errors
//       }}
//     />
//   </PayPalScriptProvider>
// )}