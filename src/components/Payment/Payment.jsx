import React from "react";
import "./Payment.css";
import { PayPal } from "./PayPal";

export const Payment = ({
  setPayment,
  price,
  generateImageStep,
  setIsPayment,
}) => {
  return (
    <div className="payment_settings">
      <div className="payment_modal">
        <button className="close_modal" onClick={() => setPayment(false)}>
          &times;
        </button>
        <PayPal
          price={price}
          generateImageStep={generateImageStep}
          setIsPayment={setIsPayment}
        />
      </div>
    </div>
  );
};
