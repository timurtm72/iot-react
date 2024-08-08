import React, {useState} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../styles/CreateDeviceStyle.css'; // Импортируем CSS-файл
import Device from '../model/Device.js';

// Определение схемы валидации
const schema = yup.object().shape({
    name: yup.string().required('Название устройства не может быть пустым'),
    description: yup.string().required('Описание устройства не может быть пустым'),
    location: yup.string().required('Местоположение устройства не может быть пустым'),
});

const CreateDevice = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const onSubmit = async (formData) => {
        setIsLoading(true);
        console.log('Начинается отправка запроса на создание устройства.');

        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            setIsLoading(false);
            showModal('Превышено время ожидания ответа от сервера.');
        }, 5000);

        // Создание экземпляра класса Device
        const device = new Device(0,formData.name, formData.description, formData.location);
        console.log('Отправка данных на сервер:', device);
        const response = await axios.post('http://localhost:8081/device', device, {signal})
            .then((resp) => {
                    clearTimeout(timeoutId);
                    setIsLoading(false);

                    console.log('Полученные данные ответа:', resp.data);

                    const {message, timestamp} = resp.data;

                    if (message && timestamp) {
                        // Форматирование времени (например, если нужно отобразить только дату)
                        const formattedTimestamp = new Date(timestamp).toLocaleString();

                        // Показ модального окна с сообщением и временем
                        showModal(`${message} ${formattedTimestamp}`);
                    }
                    reset();
                }
            ).catch(error => {
                clearTimeout(timeoutId);
                setIsLoading(false);
                console.log('При запросе произошла ошибка:', error);
                if (error.name === 'AbortError') {
                    showModal('Превышено время ожидания ответа от сервера.');
                } else if (error.response && error.response.data) {
                    showModal(`Ошибка от сервера: ${error.response.data.message || 'Произошла ошибка. Попробуйте снова.'}`);
                } else {
                    showModal('Произошла ошибка при создании устройства. Попробуйте снова.');
                }
            })
            .finally(()=>{
                setIsLoading(false);
            });
    };

    const handleClear = () => {
        // Запуск анимации очистки полей
        setTimeout(() => {
            reset();
        }, 500); // Длительность анимации
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="create-device-container">
                <h2 className="form-title">Создание устройства</h2>

                <div className="input-group">
                    <label htmlFor="name">Название устройства:</label>
                    <input id="name" type="text" {...register('name')} className="input"/>
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="description">Описание устройства:</label>
                    <textarea id="description" {...register('description')} className="input"/>
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="location">Местоположение устройства:</label>
                    <input id="location" type="text" {...register('location')} className="input"/>
                    {errors.location && <span className="error">{errors.location.message}</span>}
                </div>

                <div className="button-group">
                    <button
                        type="submit"
                        className={`button button-primary`}
                    >
                        Создать устройство
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`button button-secondary`}
                    >
                        Очистить поля
                    </button>
                </div>

                {isLoading && (
                    <div className="loading-indicator">Идет процесс добавления устройства...</div>
                )}
            </form>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={hideModal} className="modal-button">ОК</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateDevice;
