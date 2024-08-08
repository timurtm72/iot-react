// src/components/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.div`
    width: 250px;
    padding: 20px;
    background-color: #f4f4f4;
    border-right: 1px solid #ddd;
    height: 100vh;
`;

const MenuItem = styled.div`
    margin-bottom: 10px;
`;

const MenuLink = styled(Link)`
    display: block;
    padding: 10px;
    font-size: 18px;
    color: #333;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
        background-color: #ddd;
    }
`;

const Menu = () => {
    return (
        <Sidebar>
            <MenuItem><MenuLink to="/create-device">Создать Устройство</MenuLink></MenuItem>
            <MenuItem><MenuLink to="/update-led-data">Изменить данные светодиодов</MenuLink></MenuItem>
            <MenuItem><MenuLink to="/read-all-devices">Все устройства</MenuLink></MenuItem>
        </Sidebar>
    );
};

export default Menu;
