import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';

function BackToHome() {
    return (
        <>
            <NavLink to='/'><ArrowLeftOutlined />  <span>Back to home</span></NavLink>
        </>
    );
}

export default BackToHome;