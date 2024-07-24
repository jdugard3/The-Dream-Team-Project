import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const UserEditPage = () => {

  const { store, actions } = useContext(Context);
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [num, setNum] = useState("");
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const shippingData = await actions.getShippingAddress();
      if (shippingData) {
        setShippingAddress(shippingData.shipping.address);
      }
      const billingData = await actions.getBillingAddress();
      if (billingData) {
        setBillingAddress(billingData.billing.address);
      }
      const cardData = await actions.getCard();
      if (cardData) {
        setNum(cardData.card.num)
        setCvv(cardData.card.cvv)
        setMonth(cardData.card.month)
        setYear(cardData.card.year)
      }
    };
    getUserData();
  }, [actions]);

  const handleEditSubmit = async () => {
    try {
        // Ensure the payloads match the API expectations
        const shippingPayload = { shipping: { address: shippingAddress } };
        const billingPayload = { billing: { address: billingAddress } };
        const cardPayload = { num, cvv, month, year };

        // Update Shipping Address
        const updateShippingResult = await actions.updateShippingAddress(shippingPayload);
        if (!updateShippingResult) {
            alert("An error occurred while updating the shipping address.");
            return;
        }

        // Update Billing Address
        const updateBillingResult = await actions.updateBillingAddress(billingPayload);
        if (!updateBillingResult) {
            alert("An error occurred while updating the billing address.");
            return;
        }

         // Update Card Information
         const updateCardResult = await actions.updateCard(cardPayload);
         if (!updateCardResult) {
             alert("An error occurred while updating the card information.");
             return;
         }

        alert("Addresses updated successfully!");
        window.location.href = "/profile";

    } catch (error) {
        console.error("Error updating addresses:", error);
        alert("An error occurred while editing address(es).");
    }
};

  return (
    <div>
      <h2>Billing Address</h2>
      <input
        type="text"
        name="Billing Address"
        value={billingAddress}
        onChange={(e) => {
          setBillingAddress(e.target.value)
        }}
        placeholder="Billing Address"
      />

      <h2>Shipping Address</h2>
      <label>
        <input
          type="checkbox"
        // checked={useBillingAddress}
        // onChange={handleCheckboxChange}
        />
        Same as Billing Address
      </label>
      <input
        type="text"
        name="Shipping Address"
        value={shippingAddress}
        onChange={(e) => {
          setShippingAddress(e.target.value)
        }}
        placeholder="Shipping Address"
      />
      <h2>Credit Card Information</h2>
      <input
        type="text"
        name="cardNumber"
        value={num}
        onChange={(e) => {
          setNum(e.target.value)
        }}
        placeholder="Card Number"
      />
      <input
        type="text"
        name="expirationMonth"
        value={month}
        onChange={(e) => {
          setMonth(e.target.value)
        }}
        placeholder="Expiration Month"
      />
      <input
        type="text"
        name="expirationYear"
        value={year}
        onChange={(e) => {
          setYear(e.target.value)
        }}
        placeholder="Expiration Year"
      />
      <input
        type="text"
        name="cvv"
        value={cvv}
        onChange={(e) => {
          setCvv(e.target.value)
        }}
        placeholder="CVV"
      />

      <button onClick={handleEditSubmit}>Submit</button>
      <Link to="/profile"><button>Cancel</button></Link>
    </div>
  );
};

export default UserEditPage;
