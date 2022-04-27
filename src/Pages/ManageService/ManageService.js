import React from 'react';
import useServices from '../../hooks/useServices';
import PageTitle from '../../Shared/PageTitle/PageTitle';

const ManageService = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete')
        if(proceed){
            const url = `http://localhost:5000/service/${id}`
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const remaining = services.filter(service => service._id !== id)
                setServices(remaining)
            })
        }
    }
    return (
        <>
        <PageTitle title="Manage Services"></PageTitle>
        <div className='w-50 mx-auto text-center'>
            <h2>Manage services</h2>
            {
                services.map(service => <div key={service._id}><p>{service.name} <button onClick={() => handleDelete(service._id)}>x</button></p></div>)
            }
        </div>
        </>
    );
};

export default ManageService;