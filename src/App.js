import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SidebarMenu from './menu/SidebarMenu';
import CreateDevice from './components/CreateDevice';
import styled from 'styled-components';
import Marquee from './efects/Marquee';
import UpdateStripLedData from './components/UpdateStripLedData';
import ReadAllDevices from './components/ReadAllDevices';
import AppBar from './components/AppBar';

const AppContainer = styled.div`
    //padding-top: 5px; /* Adjust to make room for the marquee */
`;

const MainContent = styled.div`
    //flex: 1;
    //padding: 40px;
    //margin-top: 10px;
    //margin-left: 250px; /* Adjust this to the width of the sidebar */
    transition: margin-left 0.3s ease; /* Smooth transition for when the sidebar opens/closes */
    display: flex;
    justify-content: center; /* Центрирование по горизонтали */
    align-items: center; /* Центрирование по вертикали */
    height: 100vh; /* Высота родительского контейнера */
    //background-color: #f0f0f0; /* Фон родительского контейнера */
`;

const App = () => {
    const [deviceCount, setDeviceCount] = useState(0);
    const [pageTitle, setPageTitle] = useState('');
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/create-device':
                setPageTitle('Создание устройства');
                break;
            case '/update-led-data':
                setPageTitle('Обновление данных светодиода');
                break;
            case '/read-all-devices':
                setPageTitle('Все устройства');
                break;
            default:
                setPageTitle('Главная страница');
        }
    }, [location.pathname]);

    const handleDeviceCountChange = (count) => {
        setDeviceCount(count);
    };

    return (
        <AppContainer>
            <AppBar deviceCount={deviceCount} pageTitle={pageTitle} />
            <MainContent>
            <SidebarMenu />
                <Routes>
                    <Route path="/create-device" element={<CreateDevice />} />
                    <Route path="/update-led-data" element={<UpdateStripLedData />} />
                    <Route path="/read-all-devices" element={<ReadAllDevices onDeviceCountChange={handleDeviceCountChange} />} />
                </Routes>
            </MainContent>
        </AppContainer>
    );
};

export default App;
