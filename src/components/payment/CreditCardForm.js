import React, { useState } from 'react';
import './CreditCardForm.css';

const CreditCardForm = ({
  cardDetails,
  handleCardDetailsChange,
  handleNext,
  handlePrevious,
}) => {
  const { cardNumber, expirationDate, cvv, cardHolderName } = cardDetails;
  const [showAlert, setShowAlert] = useState(false);

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    // Remove non-digit characters from the input
    const cardNumberOnlyDigits = value.replace(/\D/g, '');
    // Format the card number into groups of 4 digits separated by spaces
    const formattedCardNumber = cardNumberOnlyDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleCardDetailsChange({ target: { name: 'cardNumber', value: formattedCardNumber } });
  };

  const handleExpirationDateChange = (event) => {
    const { value } = event.target;
    // Remove non-digit characters from the input
    const expirationDateOnlyDigits = value.replace(/\D/g, '');
    // Format the expiration date into the MM/YY format
    const formattedExpirationDate = expirationDateOnlyDigits.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    handleCardDetailsChange({ target: { name: 'expirationDate', value: formattedExpirationDate } });
  };

  const handleCvvChange = (event) => {
    const { value } = event.target;
    // Remove non-digit characters from the input
    const cvvOnlyDigits = value.replace(/\D/g, '');
    handleCardDetailsChange({ target: { name: 'cvv', value: cvvOnlyDigits } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cardHolderName && cardNumber && expirationDate && cvv) {
      handleNext();
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="credit-card-form">
  <h2 className="form-title">Credit Card Details</h2>
  {showAlert && <div className="alert">Please fill out all fields!</div>}
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="cardHolderName">Card Holder Name:</label>
      <input
        type="text"
        id="cardHolderName"
        name="cardHolderName"
        value={cardHolderName}
        onChange={handleCardDetailsChange}
        className="input-field"
      />
    </div>
    <div className="form-group">
      <label htmlFor="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={cardNumber}
        onChange={handleCardNumberChange}
        maxLength="19"
        pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
        placeholder="xxxx xxxx xxxx xxxx"
        required
        className="input-field"
      />
    </div>
    <div className="form-group">
      <label htmlFor="expirationDate">Expiration Date:</label>
      <input
        type="text"
        id="expirationDate"
        name="expirationDate"
        value={expirationDate}
        onChange={handleExpirationDateChange}
        maxLength="5"
        pattern="\d{2}/\d{2}"
        placeholder="MM/YY"
        required
        className="input-field"
      />
    </div>
    <div className="form-group">
      <label htmlFor="cvv">CVV:</label>
      <input
        type="text"
        id="cvv"
        name="cvv"
        value={cvv}
        onChange={handleCvvChange}
        maxLength="3"
        pattern="\d{3}"
        required
        className="input-field"
      />
    </div>

    <button onClick={handlePrevious} className="form-button">
      Previous
    </button>
    <button type="submit" className="form-button">
      Next
    </button>
  </form>
</div>

  );
};

export default CreditCardForm;
