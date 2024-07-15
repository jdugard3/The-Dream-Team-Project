import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const OrderPage = () => {
    const { store, actions } = useContext(Context);
    const [shippingAddress, setShippingAddress] = useState("");
    const [mailingAddress, setMailingAddress] = useState("");
    const [creditCardInfo, setCreditCardInfo] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const orderData = {
            shippingAddress,
            mailingAddress,
            creditCardInfo,
            orders: store.orders
        };
        await actions.submitOrder(orderData);
    };

    return (
        <div className="order-page">
            <h1>Complete Your Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Shipping Address</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mailing Address</label>
                    <input
                        type="text"
                        value={mailingAddress}
                        onChange={(e) => setMailingAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Credit Card Information</label>
                    <input
                        type="text"
                        value={creditCardInfo}
                        onChange={(e) => setCreditCardInfo(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm Purchase</button>
            </form>
        </div>
    );
};
