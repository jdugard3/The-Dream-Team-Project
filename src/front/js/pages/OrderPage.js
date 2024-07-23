import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/orderpage.css'



export const OrderPage = () => {
    const { store, actions } = useContext(Context);
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [creditCardNum, setCreditCardNum] = useState('');
    const [creditCardCVV, setCreditCardCVV] = useState('');
    const [creditCardMonth, setCreditCardMonth] = useState('');
    const [creditCardYear, setCreditCardYear] = useState('');
    const [orderDate, setOrderDate] = useState(new Date().toISOString());
    const [shoes, setShoes] = useState(store.cartItems); 

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const orderData = {
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            credit_card_num: creditCardNum,
            credit_card_cvv: creditCardCVV,
            credit_card_month: creditCardMonth,
            credit_card_year: creditCardYear,
            order_date: orderDate,
            shoes: shoes.map(shoe => ({ id: shoe.id }))
        };

        const result = await actions.submitOrder(orderData);

        if (result.error) {
            alert(result.error.msg || 'Order submission failed');
        } else {
            alert('Order submitted successfully');
            actions.clearCart();
            navigate('/');
        }
    };

    return (
        <div className="order-page">
            <h1>Order Page</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                    <label>Billing Address:</label>
                    <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Shipping Address:</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Credit Card Number:</label>
                    <input
                        type="text"
                        value={creditCardNum}
                        onChange={(e) => setCreditCardNum(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        value={creditCardCVV}
                        onChange={(e) => setCreditCardCVV(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Expiration Month:</label>
                    <input
                        type="text"
                        value={creditCardMonth}
                        onChange={(e) => setCreditCardMonth(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Expiration Year:</label>
                    <input
                        type="text"
                        value={creditCardYear}
                        onChange={(e) => setCreditCardYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Order Date:</label>
                    <input
                        type="text"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};
