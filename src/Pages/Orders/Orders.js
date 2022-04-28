import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../API/axiosPrivate';
import auth from '../../firebase.init';
import PageTitle from '../../Shared/PageTitle/PageTitle'

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        //load data using async await function (fetch can be used as well) and send request with access token created during login
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/orders?email=${email}`
            try{
                const {data} = await axiosPrivate.get(url);
            setOrders(data);
            }
            catch(error){
                if(error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
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