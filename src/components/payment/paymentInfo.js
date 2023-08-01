import React, { useState, useEffect } from 'react';
import PaymentMethod from './paymentMethod';
import CreditCardForm from './CreditCardForm';
import Summary from '../summary/Summary';
import AddressForm from '../addressForm/addressForm';
import './paymentInfo.css';
import { useLocation } from 'react-router-dom';

export default function PaymentInfo({ user }) {
  const locationn = useLocation();
  const orderData = locationn.state && locationn.state.orderData;

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [location, setLocation] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolderName: ''
  });
  
  console.log("step " + step);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (step === 2 && paymentMethod === 'creditCard') {
      setStep(3);
      setPaymentMethod('')
    }
  }, [step, paymentMethod]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    setCardDetails({
      ...cardDetails,
      [event.target.name]: event.target.value
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          user && (
            <AddressForm
              user={user}
              setLocation={setLocation}
              handleNext={handleNext}
            />
          )
        );
      case 2:
        return (
          <PaymentMethod
            setPaymentMethod={setPaymentMethod}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <CreditCardForm
            orderData={orderData}
            cardDetails={cardDetails}
            handleCardDetailsChange={handleCardDetailsChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Summary
            orderData={orderData}
            cardDetails={cardDetails}
            location={location}
            paymentMethod={paymentMethod}
            handlePrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return <div id='payment-container'>{renderStepContent()}</div>;
}
