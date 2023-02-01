import React from 'react';
import './ScreenLoader.css'

const ScreenLoader = () => {
    return (
        <div className="spinner flex gap-2">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    );
};

export default ScreenLoader;