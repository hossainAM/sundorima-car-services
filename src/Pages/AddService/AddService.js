import React from 'react';
import { useForm } from "react-hook-form";
import PageTitle from '../../Shared/PageTitle/PageTitle';
const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        const url = `http://localhost:5000/service`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => console.log(result))
    };
    return (
        <>
        <PageTitle title="Add Service"></PageTitle>
        <div className='w-50 mx-auto'>
            <h2>Add a service</h2>
             <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' placeholder='description'{...register("description")} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' placeholder='PhotoUrl' type="text" {...register("img", { min: 18, max: 99 })} />
                <button className='w-25 mx-auto btn btn-primary' type="submit">Add Service</button>
            </form>
        </div>
        </>
    );
};

export default AddService;