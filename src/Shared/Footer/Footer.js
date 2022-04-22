import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p className='text-center my-5'><small>copyright &copy; {new Date().getFullYear()}</small></p>
        </footer>
    );
};

export default Footer;