import React from 'react';
import './ConfirmPay.css';

export default function ConfirmPay({ onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} /> {/* Overlay to close the modal when clicked outside */}
      <div className="modal-content">
      <div class="card-confirm">
          <h2 className='header-order'>Order Confirmation</h2>
          <p>Thank you for your purchase!</p>
          <p>Your order has been confirmed and will be processed shortly.</p>
          <button className="close-button" onClick={onClose}>Close</button> {/* Close button */}
        </div>
        </div>
    </>
  );
}
