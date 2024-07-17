import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const OrderPage = () => {
    const { store, actions } = useContext(Context);
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardMonth, setCardMonth] = useState("");
    const [cardYear, setCardYear] = useState("");


    const handleOrderSubmit = async () => {
        const success = await actions.submitOrder({
            shippingAddress,
            billingAddress,
            cardNumber,
            cardCvv,
            cardMonth,
            cardYear
        });
        if (success) {
            alert("Order submitted successfully!");
        } else {
            alert("There was an error submitting your order. Please try again.");
        }
    };

    return (
        <div>
            <h1>Order Page</h1>
            <div>
                <h3>Shipping Address</h3>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                />
            </div>
            <div>
                <h3>Billing Address</h3>
                <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                />
            </div>
            <div>
                <h3>Card Number</h3>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div>
                <h3>CVV Code</h3>
                <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                />
            </div>
            <div>
                <h3>Credit Card Month</h3>
                <input
                    type="text"
                    value={cardMonth}
                    onChange={(e) => setCardMonth(e.target.value)}
                />
            </div>
            <div>
                <h3>Credit Card Year</h3>
                <input
                    type="text"
                    value={cardYear}
                    onChange={(e) => setCardYear(e.target.value)}
                />
            </div>
            <div>
                <h3>Cart Items</h3>
                {store.orders.map((item, index) => (
                    <div key={index}>
                        <p>{item.name} - ${item.retailPrice}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleOrderSubmit}>Confirm Purchase</button>
        </div>
    );
};