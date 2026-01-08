import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



const HiderHeader = ({ children }) => {

    const location = useLocation();
    // const hideDashboardUrl = location.pathname.includes('dashboard');

    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
        console.log(`this is ${location}`);
        if (location.pathname === '/' || location.pathname==='/register') {
            setShowNavbar(false);
        } else {
            setShowNavbar(true)
        }
    }, [location]);

    return (
        <div>{showNavbar && children}</div>
    );
}

export default HiderHeader;
