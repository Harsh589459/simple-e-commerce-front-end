import React from 'react';
import './Success.scss'; // Import the CSS file for styling
import { FaCheck } from 'react-icons/fa';


const Success = () => {
    return (
        <div className="payment-succes-container">
            <h1>Payment Successfull!</h1>
            <h2>Thanks for your Purchase</h2>
            <div className='tick-icon-container'>        <FaCheck className="tick-icon" />

            </div>

        </div>
    );
};

export default Success;
