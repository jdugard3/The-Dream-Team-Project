import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/orderspage.css";

export const OrderPage = () => {
    const { store, actions } = useContext(Context);
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [cardMonth, setCardMonth] = useState("");
    const [cardYear, setCardYear] = useState("");

    // below is the useState codes in charge of checking fields, valid card number, etc
    const [emptyShipping, setEmptyShipping] = useState("");
    const [emptyBilling, setEmptyBilling] = useState("");
    const [emptyCardNum, setEmptyCardNum] = useState("");
    const [emptyCvv, setEmptyCvv] = useState("");
    const [emptyCardMonth, setEmptyCardMonth] = useState("");
    const [emptyCardYear, setEmptyCardYear] = useState("");

    const handleOrderSubmit = () => {
        setEmptyShipping("");
        setEmptyBilling("");
        setEmptyCardNum("");
        setEmptyCvv("");
        setEmptyCardMonth("");
        setEmptyCardYear("");

        actions.submitOrder(shippingAddress, billingAddress, cardNumber, cardCvv, cardMonth, cardYear);

        if (shippingAddress === "") {
            setEmptyShipping("Field required");
        }
        if (billingAddress === "") {
            setEmptyBilling("Field required");
        }
        if (cardNumber === "") {
            setEmptyCardNum("Field required");
        }
        if (cardCvv === "") {
            setEmptyCvv("Field required");
        }
        if (cardMonth === "") {
            setEmptyCardMonth("Field required");
        }
        if (cardYear === "") {
            setEmptyCardYear("Field required");
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 16) {
            setCardNumber(value);
        }
    };

    const handleCardCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setCardCvv(value);
        }
    };

    return (
        <div>
            <h1>Order Page</h1>
            <div>
                <h3>Shipping Address</h3>
                <input
                    type="text"
                    placeholder="Enter shipping address"
                    value={shippingAddress}
                    onChange={e => setShippingAddress(e.target.value)}
                    required
                />
                {emptyShipping && <div style={{ color: 'red' }}>{emptyShipping}</div>}
            </div>
            <div>
                <h3>Billing Address</h3>
                <input
                    type="text"
                    placeholder="Enter billing address"
                    value={billingAddress}
                    onChange={e => setBillingAddress(e.target.value)}
                    required
                />
                {emptyBilling && <div style={{ color: 'red' }}>{emptyBilling}</div>}
            </div>
            <div>
                <h3>Card Number</h3>
                <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={16}
                    required
                />
                {emptyCardNum && <div style={{ color: 'red' }}>{emptyCardNum}</div>}
            </div>
            <div>
                <h3>CVV Code</h3>
                <input
                    type="text"
                    placeholder="CVV"
                    value={cardCvv}
                    onChange={handleCardCvvChange}
                    maxLength={4}
                    required
                />
                {emptyCvv && <div style={{ color: 'red' }}>{emptyCvv}</div>}
            </div>
            <div>
                <h3>Credit Card Month</h3>
                <input
                    type="text"
                    placeholder="Card Month"
                    value={cardMonth}
                    onChange={e => setCardMonth(e.target.value)}
                    required
                />
                {emptyCardMonth && <div style={{ color: 'red' }}>{emptyCardMonth}</div>}
            </div>
            <div>
                <h3>Credit Card Year</h3>
                <input
                    type="text"
                    placeholder="Card Year"
                    value={cardYear}
                    onChange={e => setCardYear(e.target.value)}
                    required
                />
                {emptyCardYear && <div style={{ color: 'red' }}>{emptyCardYear}</div>}
            </div>
            <div className="cart-display">
                <h3>Cart Items</h3>
                {store.orders.map((item, index) => (
                    <div className="item-wrapper" key={index}>
                        <div className="item-image-box">Image here</div>
                        <div className="item-details">
                            <p>{item.name} - ${item.retailPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleOrderSubmit}>Confirm Purchase</button>
        </div>
    );
};
