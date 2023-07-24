import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Pages/Shared/Navigation';
import Footer from '../Pages/Shared/Footer';

const Main = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;