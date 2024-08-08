import React from 'react';
import '../styles/AppBarStyle.css';

const AppBar = ({deviceCount,pageTitle}) => {
    return (
        <div className="app-bar">
            <span className="app-bar-left-text">{pageTitle}</span>
            <span className="app-bar-right-text">Количество устройств: {deviceCount}</span>
        </div>
    );
};

export default AppBar;
