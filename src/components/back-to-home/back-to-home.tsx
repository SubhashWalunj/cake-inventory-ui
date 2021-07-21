import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './back-to-home.css';

function BackToHome() {
    return (
        <div className="back-to-home-container">
            <NavLink to='/'><ArrowLeftOutlined />  <span>Back to home</span></NavLink>
        </div>
    );
}

export default BackToHome;