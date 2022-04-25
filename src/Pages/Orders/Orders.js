import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const url = `http://localhost:5000/orders`
            const {data} = await axios.get(url);
            setOrders(data);
        }
        getOrders();
    }, []);

    return (
        <div>
            <h2>Your Orders: {orders.length}</h2>
        </div>
    );
};

export default Orders;