import React, {useState} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import '../styles/CreateDeviceStyle.css'; // Импортируем CSS-файл
import StripLedData from '../model/StripLedData';
// Определение схемы валидации
const schema = yup.object().shape({
    id: yup.number().typeError('ID не может быть пустым').min(0, 'ID не может быть отрицательным'),
    index: yup.number().typeError('Индекс не может быть пустым').min(0, 'Индекс не может быть отрицательным').max(255, 'Индекс не может быть больше 255'),
    redColor: yup.number().typeError('Значение цвета красного светодиода не может быть пустым').min(0, 'Значение цвета красного светодиода не может быть отрицательным').max(255, 'Значение цвета красного светодиода не может быть больше 255'),
    greenColor: yup.number().typeError('Значение цвета зеленого светодиода не может быть пустым').min(0, 'Значение цвета зеленого светодиода не может быть отрицательным').max(255, 'Значение цвета зеленого светодиода не может быть больше 255'),
    blueColor: yup.number().typeError('Значение цвета синего светодиода не может быть пустым').min(0, 'Значение цвета синего светодиода не может быть отрицательным').max(255, 'Значение цвета синего светодиода не может быть больше 255'),
});

const UpdateStripLedData = () => {
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
        console.log('Начинается отправка запроса на обновление данных светодиодов.');

        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            setIsLoading(false);
            showModal('Превышено время ожидания ответа от сервера.');
        }, 5000);

        // Создание экземпляра класса StripLedData
        const stripLedData = new StripLedData(formData.id, formData.index, formData.redColor, formData.greenColor, formData.blueColor);
        // Сохранение значения id в временную переменную
        const id = stripLedData.id;
        // Удаление свойства id из объекта
        delete stripLedData.id;
        console.log(stripLedData)
        console.log('Отправка данных на сервер:', stripLedData);
        const response = await axios.post(`http://localhost:8081/led_device/add_strip_led_data/${id}`, stripLedData, {signal})
            .then(resp => {
                    clearTimeout(timeoutId);
                    setIsLoading(false);

                    console.log('Полученные данные ответа:', resp.data);

                    const {message, timestamp} = resp.data;

                    if (message && timestamp) {
                        const formattedTimestamp = new Date(timestamp).toLocaleString();
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
                    showModal('Произошла ошибка при обновлении данных. Попробуйте снова.');
                }
            })
            .finally(()=>{
                setIsLoading(false);
            });

    }
    const handleClear = () => {
        // Запуск анимации очистки полей
        setTimeout(() => {
            reset();
        }, 500); // Длительность анимации
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="create-device-container">
                <h2 className="form-title">Обновление данных светодиодов</h2>

                <div className="input-group">
                    <label htmlFor="id">ID:</label>
                    <input id="id" type="number" {...register('id')} className="input"/>
                    {errors.id && <span className="error">{errors.id.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="index">Индекс:</label>
                    <input id="index" type="number" {...register('index')} className="input"/>
                    {errors.index && <span className="error">{errors.index.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="redColor">Цвет красного светодиода:</label>
                    <input id="redColor" type="number" {...register('redColor')} className="input"/>
                    {errors.redColor && <span className="error">{errors.redColor.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="greenColor">Цвет зеленого светодиода:</label>
                    <input id="greenColor" type="number" {...register('greenColor')} className="input"/>
                    {errors.greenColor && <span className="error">{errors.greenColor.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="blueColor">Цвет синего светодиода:</label>
                    <input id="blueColor" type="number" {...register('blueColor')} className="input"/>
                    {errors.blueColor && <span className="error">{errors.blueColor.message}</span>}
                </div>

                <div className="button-group">
                    <button
                        type="submit"
                        className={`button button-primary`}
                    >
                        Обновить данные
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
                    <div className="loading-indicator">Идет процесс обновления данных...</div>
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

export default UpdateStripLedData;
