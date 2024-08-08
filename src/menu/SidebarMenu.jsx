// // src/components/SidebarMenu.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import {
//     FaTh,
//     FaTimes,
//     FaPlus,
//     FaEdit,
//     FaDatabase,
//     FaLightbulb,
//     FaSignInAlt,
//     FaSignOutAlt,
//     FaChartLine,
//     FaMicrochip
// } from 'react-icons/fa';
//
// // Styled components
// const SidebarContainer = styled.div`
//     position: fixed;
//     top: 50px;
//     left: ${props => (props.isOpen ? '0' : '-250px')};
//     width: 250px;
//     height: 100%;
//     background-color: #f4f4f4;
//     border-right: 1px solid #ddd;
//     transition: left 0.3s ease;
//     z-index: 1000;
//     box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
// `;
//
// const SidebarContent = styled.div`
//     padding: 20px;
// `;
//
// const MenuItem = styled.div`
//     margin-bottom: 10px;
//     display: flex;
//     align-items: center;
// `;
//
// const MenuLink = styled(Link)`
//     display: flex;
//     align-items: center;
//     padding: 10px;
//     font-size: 18px;
//     color: #333;
//     text-decoration: none;
//     border-radius: 4px;
//
//     &:hover {
//         background-color: #ddd;
//     }
// `;
//
// const Icon = styled.div`
//     margin-right: 10px;
//     font-size: 20px;
//     color: #007bff;
// `;
//
// const CloseButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background: none;
//     border: none;
//     font-size: 24px;
//     cursor: pointer;
//     color: #333;
// `;
//
// const ToggleButtonContainer = styled.div`
//     position: fixed;
//     top: 80px; /* Adjust the position */
//     left: 20px;
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     z-index: 1000;
// `;
//
// const ToggleButton = styled.button`
//     background: #007bff;
//     border: none;
//     color: #fff;
//     padding: 10px;
//     border-radius: 50%;
//     font-size: 24px;
//     margin-right: 10px;
// `;
//
// const ToggleText = styled.span`
//   font-size: 16px;
//   color: #007bff;
// `;
//
// // Sidebar Menu Component
// const SidebarMenu = () => {
//     const [isOpen, setIsOpen] = useState(false);
//
//     const toggleSidebar = () => setIsOpen(!isOpen);
//
//     return (
//         <>
//             <ToggleButtonContainer>
//                 <ToggleButton onClick={toggleSidebar}>
//                     <FaTh /> {/* Intuitive icon */}
//                 </ToggleButton>
//                 <ToggleText>МЕНЮ</ToggleText>
//             </ToggleButtonContainer>
//             <SidebarContainer isOpen={isOpen}>
//                 <CloseButton onClick={toggleSidebar}>
//                     <FaTimes />
//                 </CloseButton>
//                 <SidebarContent>
//                     <MenuItem>
//                         <MenuLink to="/create-device">
//                             <Icon><FaPlus /></Icon>
//                             Создать Устройство
//                         </MenuLink>
//                     </MenuItem>
//                        <MenuItem>
//                         <MenuLink to="/read-all-devices">
//                             <Icon><FaMicrochip /></Icon>
//                             Все устройства
//                         </MenuLink>
//                     </MenuItem>
//                     <MenuItem>
//                         <MenuLink to="/update-led-data">
//                             <Icon><FaLightbulb /></Icon>
//                             Обновить данные светодиодов
//                         </MenuLink>
//                     </MenuItem>
//                  </SidebarContent>
//             </SidebarContainer>
//         </>
//     );
// };
//
// export default SidebarMenu;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
    FaTh,
    FaTimes,
    FaPlus,
    FaEdit,
    FaDatabase,
    FaLightbulb,
    FaSignInAlt,
    FaSignOutAlt,
    FaChartLine,
    FaMicrochip
} from 'react-icons/fa';

// Styled components
const SidebarContainer = styled.div`
    position: fixed;
    top: 50px;
    left: ${props => (props.isOpen ? '0' : '-250px')};
    width: 250px;
    height: 100%;
    background-color: #f4f4f4;
    border-right: 1px solid #ddd;
    transition: left 0.3s ease;
    z-index: 1000;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const SidebarContent = styled.div`
    padding: 20px;
`;

const MenuItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const MenuLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 18px;
    color: #333;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
        background-color: #ddd;
    }
`;

const Icon = styled.div`
    margin-right: 10px;
    font-size: 20px;
    color: #007bff;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
`;

const ToggleButtonContainer = styled.div`
    position: fixed;
    top: 80px; /* Adjust the position */
    left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1000;
`;

const ToggleButton = styled.button`
    background: #007bff;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    font-size: 24px;
    margin-right: 10px;
`;

const ToggleText = styled.span`
  font-size: 16px;
  color: #007bff;
`;

// Sidebar Menu Component
const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <ToggleButtonContainer>
                <ToggleButton onClick={toggleSidebar}>
                    <FaTh />
                </ToggleButton>
                <ToggleText>МЕНЮ</ToggleText>
            </ToggleButtonContainer>
            <SidebarContainer isOpen={isOpen} ref={menuRef}>
                <CloseButton onClick={toggleSidebar}>
                    <FaTimes />
                </CloseButton>
                <SidebarContent>
                    <MenuItem>
                        <MenuLink to="/create-device">
                            <Icon><FaPlus /></Icon>
                            Создать Устройство
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink to="/read-all-devices">
                            <Icon><FaMicrochip /></Icon>
                            Все устройства
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink to="/update-led-data">
                            <Icon><FaLightbulb /></Icon>
                            Обновить данные светодиодов
                        </MenuLink>
                    </MenuItem>
                </SidebarContent>
            </SidebarContainer>
        </>
    );
};

export default SidebarMenu;
