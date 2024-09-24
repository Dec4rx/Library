import React from 'react';
import { Link } from 'react-router-dom';

const NoPage: React.FC = () => {
    return (
        <div className='form-container'>
            <div>
                <h3 style={{ fontSize: '72px' }}>404</h3>
                <h1 style={{ fontSize: '50px' }}>Page not found</h1>
                <p style={{ fontSize: '30px' }}>Sorry, the page you are looking for does not exist.</p>
                <Link style={{ fontSize: '30px' }} to="/">Back to main page</Link>
            </div>
        </div>
    );
};

export default NoPage;