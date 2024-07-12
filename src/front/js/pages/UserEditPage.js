import React, { useContext }from 'react';
import '../../styles/profile.css';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';

export const UserEditPage = () => {
    const { store, actions } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            shippingAddress,
            billingAddress,
            creditCardNumber,
            creditCardCVV,
            creditCardYear,
            creditCardMonth,
        };
        console.log(userData);
    };

    return (
        <div>
            <h1>User Edit Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Shipping Address:</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Billing Address:</label>
                    <input
                        type="text"
                        value={billingSameAsShipping ? shippingAddress : billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        disabled={billingSameAsShipping}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={billingSameAsShipping}
                            onChange={handleCheckboxChange}
                        />
                        Billing address same as shipping address
                    </label>
                </div>
                <div>
                    <label>Credit Card Number:</label>
                    <input
                        type="text"
                        value={creditCardNumber}
                        onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Credit Card CVV:</label>
                    <input
                        type="text"
                        value={creditCardCVV}
                        onChange={(e) => setCreditCardCVV(e.target.value)}
                    />
                </div>
                <div>
                    <label>Credit Card Expiration Year:</label>
                    <input
                        type="text"
                        value={creditCardYear}
                        onChange={(e) => setCreditCardYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Credit Card Expiration Month:</label>
                    <input
                        type="text"
                        value={creditCardMonth}
                        onChange={(e) => setCreditCardMonth(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserEditPage;