import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const OrderPage = () => {
    const { store, actions } = useContext(Context);
    const [shippingAddress, setShippingAddress] = useState("");
    const [mailingAddress, setMailingAddress] = useState("");
    const [creditCard, setCreditCard] = useState("");

    const handleOrderSubmit = async () => {
        const orderData = {
            shippingAddress,
            mailingAddress,
            creditCard,
            items: store.orders,
        };

        const success = await actions.submitOrder(orderData);
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
                <h2>Shipping Address</h2>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                />
            </div>
            <div>
                <h2>Mailing Address</h2>
                <input
                    type="text"
                    value={mailingAddress}
                    onChange={(e) => setMailingAddress(e.target.value)}
                />
            </div>
            <div>
                <h2>Credit Card Information</h2>
                <input
                    type="text"
                    value={creditCard}
                    onChange={(e) => setCreditCard(e.target.value)}
                />
            </div>
            <div>
                <h2>Cart Items</h2>
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