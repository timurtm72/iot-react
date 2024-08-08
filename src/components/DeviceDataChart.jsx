// src/components/DeviceDataChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DeviceDataChart = ({ data }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Filter data based on selected date range
        const filtered = data.filter(d => {
            const date = new Date(d.timestamp);
            return date >= startDate && date <= endDate;
        });
        setFilteredData(filtered);
    }, [data, startDate, endDate]);

    // Prepare data for the chart
    const chartData = {
        labels: filteredData.map(d => d.timestamp), // X-axis labels
        datasets: [
            {
                label: 'Входные Данные',
                data: filteredData.map(d => d.inputValue), // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <h2>График Входных Данных</h2>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>С:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Выберите дату и время начала"
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '14px',
                            width: '150px'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px' }}>По:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="Выберите дату и время окончания"
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px',
                            fontSize: '14px',
                            width: '150px'
                        }}
                    />
                </div>
            </div>
            <div style={{ marginTop: '60px', width: '100%', height: '400px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default DeviceDataChart;
