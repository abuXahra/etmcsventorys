import React from 'react';
import { Circles } from 'react-loader-spinner'
import { LoaderWrapper } from './Loader.style';

const Loader = ({title}) => {
    return (
        <LoaderWrapper>
            <Circles
                height="80"
                width="80"
                color="#1C6875"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <h5>Loading {title}</h5>
        </LoaderWrapper>
    );
}

export default Loader;
