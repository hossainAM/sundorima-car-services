import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const {serviceId} = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(response => {
            const {data} = response;
            if(data.insertedId) {
                toast('Your order is booked!!');
                e.target.reset();
            }
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Proceed Check Out for {service.name}</h2>
            <form onSubmit={handleFormSubmit}>
                <input className='w-100 mb-2' type="text" name="name" value={user.displayName} placeholder='Name' required readOnly disabled/>
                <br/>
                <input className='w-100 mb-2' type="email" name="email" value={user.email} placeholder='Email' required readOnly disabled />
                <br/>
                <input className='w-100 mb-2' type="text" name="address" placeholder='Address' autoComplete='off'/>
                <br/>
                <input className='w-100 mb-2' type="text" name="phone" placeholder='Phone' autoComplete='off'/>
                <br/>
                <input className='w-100 mb-2' type="text" name="service" value={service.name} placeholder='Service Name' readOnly/>
                <br/>
                <Link to={'/orders'} className='btn btn-primary py-2 w-25 d-block mx-auto' type="submit">Place Order</Link>
            </form>
        </div>
    );
};

export default CheckOut;