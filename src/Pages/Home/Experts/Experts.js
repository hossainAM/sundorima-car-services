import React from 'react';
import expert1 from '../../../images/experts/expert-1.jpg';
import expert2 from '../../../images/experts/expert-2.jpg';
import expert3 from '../../../images/experts/expert-3.jpg';
import expert4 from '../../../images/experts/expert-4.jpg';
import expert5 from '../../../images/experts/expert-5.jpg';
import expert6 from '../../../images/experts/expert-6.png';
import Expert from '../Expert/Expert';

const experts = [
    {id: 1, name: 'Amir Hossain', img: expert1},
    {id: 2, name: 'Arif Hossain', img: expert2},
    {id: 3, name: 'Raiyan Hossain', img: expert3},
    {id: 4, name: 'Ameera Hossain', img: expert4},
    {id: 5, name: 'Samira Hossain', img: expert5},
    {id: 6, name: 'Anwar Hossain', img: expert6},
]

const Experts = () => {
    return (
        <div className='container' id='experts'>
           <div className="row">
                <h2 className='text-center text-danger mt-5'  >Meet Our Experts</h2>
                <div className="row">
                    {
                        experts.map(expert => <Expert key={expert.id} expert={expert}></Expert>)
                    }
                </div>
           </div>
        </div>
    );
};

export default Experts;