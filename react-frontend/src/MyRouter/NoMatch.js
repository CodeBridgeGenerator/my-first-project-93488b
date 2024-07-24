import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const NoMatch = () => {
    const navigate = useNavigate();
    return (
        <div className="card col-12">
            <div style={{ height: '5em' }} />
            <p
                style={{
                    fontSize: '60px',
                    fontWeight: '600',
                    textAlign: 'center',
                    margin: 0
                }}
            >
                Ops!
            </p>
            <p style={{ fontSize: '24px', textAlign: 'center' }}>Page not available!</p>

            <Button label="Return Home" className="mr-2 mb-2" onClick={() => navigate('/')}></Button>
        </div>
    );
};

export default NoMatch;
