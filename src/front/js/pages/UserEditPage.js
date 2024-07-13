import React, { useState } from 'react';

export const UserEditPage = () => {
  
  return (
    <div>
      <h2>Billing Address</h2>
      <input
        type="text"
        name="street"
        value={billingAddress.street}
        onChange={handleBillingAddressChange}
        placeholder="Street"
      />
      <input
        type="text"
        name="city"
        value={billingAddress.city}
        onChange={handleBillingAddressChange}
        placeholder="City"
      />
      <input
        type="text"
        name="state"
        value={billingAddress.state}
        onChange={handleBillingAddressChange}
        placeholder="State"
      />
      <input
        type="text"
        name="zip"
        value={billingAddress.zip}
        onChange={handleBillingAddressChange}
        placeholder="Zip Code"
      />
      
      <h2>Shipping Address</h2>
      <label>
        <input
          type="checkbox"
          checked={useBillingAddress}
          onChange={handleCheckboxChange}
        />
        Same as Billing Address
      </label>
      <input
        type="text"
        name="street"
        value={shippingAddress.street}
        onChange={handleShippingAddressChange}
        placeholder="Street"
        disabled={useBillingAddress}
      />
      <input
        type="text"
        name="city"
        value={shippingAddress.city}
        onChange={handleShippingAddressChange}
        placeholder="City"
        disabled={useBillingAddress}
      />
      <input
        type="text"
        name="state"
        value={shippingAddress.state}
        onChange={handleShippingAddressChange}
        placeholder="State"
        disabled={useBillingAddress}
      />
      <input
        type="text"
        name="zip"
        value={shippingAddress.zip}
        onChange={handleShippingAddressChange}
        placeholder="Zip Code"
        disabled={useBillingAddress}
      />

      <h2>Credit Card Information</h2>
      <input
        type="text"
        name="cardNumber"
        value={creditCardInfo.cardNumber}
        onChange={handleCreditCardChange}
        placeholder="Card Number"
      />
      <input
        type="text"
        name="expirationDate"
        value={creditCardInfo.expirationDate}
        onChange={handleCreditCardChange}
        placeholder="Expiration Date"
      />
      <input
        type="text"
        name="cvv"
        value={creditCardInfo.cvv}
        onChange={handleCreditCardChange}
        placeholder="CVV"
      />

      <button onClick={() => console.log('Submit')}>Submit</button>
    </div>
  );
};

export default UserEditPage;
