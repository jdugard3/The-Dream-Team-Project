import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/UserEdit.css";

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
        setNum(cardData.card.num);
        setCvv(cardData.card.cvv);
        setMonth(cardData.card.month);
        setYear(cardData.card.year);
      }
    };
    getUserData();
  }, [actions]);

  const handleEditSubmit = async () => {
    try {
      const shippingPayload = { shipping: { address: shippingAddress } };
      const billingPayload = { billing: { address: billingAddress } };
      const cardPayload = { num, cvv, month, year };

      const updateShippingResult = await actions.updateShippingAddress(shippingPayload);
      if (!updateShippingResult) {
        alert("An error occurred while updating the shipping address.");
        return;
      }
      const updateBillingResult = await actions.updateBillingAddress(billingPayload);
      if (!updateBillingResult) {
        alert("An error occurred while updating the billing address.");
        return;
      }
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
    <div className="user-edit-page">
      <div className="row">
        <div className="col-10">
          <h2>Billing Address</h2>
          <input
            type="text"
            name="Billing Address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Billing Address"
          />
          <h2>Shipping Address</h2>
          <input
            type="text"
            name="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Shipping Address"
          />
          <h2>Credit Card Information</h2>
          <h4>Credit card Number</h4>
          <input
            type="text"
            name="cardNumber"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="Card Number"
          />
          <h4>Expiration Month</h4>
          <input
            type="text"
            name="expirationMonth"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Expiration Month"
          />
          <h4>Expiration Year</h4>
          <input
            type="text"
            name="expirationYear"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Expiration Year"
          />
          <h4>CVV</h4>
          <input
            type="text"
            name="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          />
          <div>
            <button onClick={handleEditSubmit}>Submit</button>
            <Link to="/profile"><button>Cancel</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserEditPage;
