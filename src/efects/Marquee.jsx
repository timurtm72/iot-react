// src/components/Marquee.js
import React from 'react';
import styled from 'styled-components';

const MarqueeContainer = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: #007bff;
    color: white;
    padding: 10px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const MarqueeContent = styled.div`
    display: inline-block;
    white-space: nowrap;
    animation: marquee 10s linear infinite;
    font-size: 22px;
    font-weight: bold;

    @keyframes marquee {
        0% {
            transform: translateX(200%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
`;

const Marquee = () => {
    return (
        <MarqueeContainer>
            <MarqueeContent>
                Вы находитесь на главной странице управления устройством через сервер
            </MarqueeContent>
        </MarqueeContainer>
    );
};

export default Marquee;
