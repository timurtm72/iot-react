import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/ReadAllDevicesStyle.css'; // Импортируйте ваши стили

const ReadAllDevices = ({ onDeviceCountChange }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };
    const fetchDevices = async () => {
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            setIsLoading(false);
            showModal('Превышено время ожидания ответа от сервера.');
        }, 5000);
        console.log('Отправка запроса на считывание устройств.');
        const response = await axios.get('http://localhost:8081/device')
            .then(resp => {
                clearTimeout(timeoutId);
                setIsLoading(false);
                const devicesData = resp.data;
                const count = resp.data.length;
                onDeviceCountChange(count);
                console.log('Пришли данные.', devicesData);
                setDevices(devicesData);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                setIsLoading(false);
                console.log('При запросе произошла ошибка:', error);
                if (error.name === 'AbortError') {
                    showModal('Превышено время ожидания ответа от сервера.');
                } else if (error.response && error.response.data) {
                    showModal(`Ошибка от сервера: ${error.response.data.message || 'Произошла ошибка. Попробуйте снова.'}`);
                } else {
                    showModal('Произошла ошибка при считывании устройств. Попробуйте снова.');
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
        useEffect(() => {
            fetchDevices();
        }, [ onDeviceCountChange]);


        return (
            <div>
                <div className="read-all-devices-container">
                    {/*<h2 className="form-title">Все устройства</h2>*/}
                    <div className="devices-list">
                        {devices.map(device => (
                            <div key={device.id} className="device-item">
                                <h4 className="id-style">ID: {device.id}</h4>
                                <h3 className="name-style">Имя устройства: {device.name}</h3>
                                <p className="field-style">Описание устройства: {device.description}</p>
                                <p className="field-style">Местоположение устройства: {device.location}</p>
                                <div className="button-group">
                                    <button
                                        type="button"
                                        // onClick={handleClear}
                                        className={`button button-primary`}
                                    >
                                        Даные светодиодов
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={handleClear}
                                        className={`button button-primary`}
                                    >
                                        Данные устройства
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={handleClear}
                                        className={`button button-primary`}
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        type="button"
                                        // onClick={handleClear}
                                        className={`button button-secondary`}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {modalVisible && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>{modalMessage}</p>
                                <button onClick={hideModal} className="modal-button">ОК</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="fetch-button-container">
                    <button style={{display: loading ? 'none' : 'block'}} // Скрыть кнопку, если загрузка идет
                            className="button button-started" onClick={fetchDevices}>
                        Считать устройства
                    </button>
                    {loading && <div className="loading-indicator">Идет процесс загрузки...</div>}
                </div>
            </div>
        );
};
export default ReadAllDevices;
