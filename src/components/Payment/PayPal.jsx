import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";

export const PayPal = ({ price, generateImageStep, setIsPayment }) => {
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "NFT-Generator",
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      // alert("Payment successful!!");
      generateImageStep();
      setIsPayment(false);
    }
  }, [success]);

  console.log(1, orderID);
  console.log(2, success);
  console.log(3, ErrorMessage);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AYc6YGFHF1Xw19mlR3MrTmP4xQ61avH0FvxI8AnLGHOJcCSGzCrgNH-XzUBH45e24AL96nrTRAG5wdkg",
      }}
    >
      <div>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
    </PayPalScriptProvider>
  );
};
