import React from 'react';

const Loader = () => {
    return (
        <div className="hide" id='loader'>
        <div className='container-load' >
            <div className='Loader'></div>
            <h2 className='loader-name'>Loading...</h2>
        </div>
        </div>
    );
};

export default Loader;