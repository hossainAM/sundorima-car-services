import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/service')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])

    // console.log(services);

    return (
        <div className='container' id='services'>
            <h1 className="services-title my-5" >Our Services</h1>
            <div className="services-container">
                {
                services.map(service => <Service key={service._id} service={service}></Service>)
            }
            </div>
        </div>
    );
};

export default Services;