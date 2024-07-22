import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";


export const UserEditPage = () => {

  const {store, actions} = useContext(Context);
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [card, setCard] = useState("");

  /*useEffect(() => {
    const getUserData = async () => {
      actions.getShippingAddress()
      setShippingAddress(await actions.getShippingAddress())
    }
  })*/
  useEffect(() => {
    actions.getShippingAddress()
    setShippingAddress(shipping.address)
  })
  const handleEditSubmit = async () => {
    let result = await actions.updateShippingAddress(shippingAddress);
    if (result) {
      console.log("Successfully updated shipping address")
    } else {
      console.alert("Failed to update")
    }
  }
  
  return (
    <div>
      <h2>Billing Address</h2>
      <input
        type="text"
        name="Billing Address"
        // value={billingAddress.street}
        // onChange={handleBillingAddressChange}
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
        // onChange={handleShippingAddressChange}
        placeholder="Shipping Address"
        // disabled={useBillingAddress}
      />
      <h2>Credit Card Information</h2>
      <input
        type="text"
        name="cardNumber"
//        value={creditCardInfo.cardNumber}
//        onChange={handleCreditCardChange}
        placeholder="Card Number"
      />
      <input
        type="text"
        name="expirationMonth"
//        value={creditCardInfo.expirationMonth}
//        onChange={handleCreditCardChange}
        placeholder="Expiration Month"
      />
      <input
        type="text"
        name="expirationYear"
//        value={creditCardInfo.expirationYear}
//        onChange={handleCreditCardChange}
        placeholder="Expiration Year"
      />
      <input
        type="text"
        name="cvv"
//        value={creditCardInfo.cvv}
//        onChange={handleCreditCardChange}
        placeholder="CVV"
      />

      <button onClick={{}}>Submit</button>
    </div>
  );
};

export default UserEditPage;
