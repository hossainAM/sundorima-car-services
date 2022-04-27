import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import PageTitle from '../../Shared/PageTitle/PageTitle'

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        //load data using async await function (fetch can be used as well)
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/orders?email=${email}`
            const {data} = await axios.get(url);
            setOrders(data);
        }
        getOrders();
    }, [user]);

    return (
        <div>
            <PageTitle title="Orders"></PageTitle>
            <h2>Your Orders for {user.email}: {orders.length}</h2>
        </div>
    );
};

export default Orders;