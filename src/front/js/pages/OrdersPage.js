import React from 'react';
import '../../styles/orders.css';

export const OrdersPage = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">[username]'s Orders</h1>
            <table className="table table-hover">
                <thead className="table">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Number</th>
                        <th scope="col">Details</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>05/12/2024</td>
                        <td>4</td>
                        <td>details on order 4</td>
                        <td>$250.00</td>
                    </tr>
                    <tr>
                        <td>03/14/2024</td>
                        <td>3</td>
                        <td>details on order 3</td>
                        <td>$715.26</td>
						</tr>
                    <tr>
                        <td>01/02/2024</td>
                        <td>2</td>
                        <td>details on order 2</td>
                        <td>$320.24</td>
						</tr>
                    <tr>
                        <td>11/26/2023</td>
                        <td>1</td>
                        <td>details on order 1</td>
                        <td>$305.05</td>
					</tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;
