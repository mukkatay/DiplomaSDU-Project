import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FileBase from 'react-file-base64';

import { createAntitheftPost } from "../../../actions/antitheft";

import Breadcrumbs from "../../Breadcrumbs";
import Input from "../../SignUp/Input";

import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { CLEAR_STATE } from "../../../constants/actionTypes";

const initialState = {mark:'', stateNumber:'', model: '', vin: '', color: '', thiftDate:'', releaseYear:'', location: '', amount:'', ownerNumber: '', specialMarks:''};
const errorsInitialState = {mark:'', stateNumber:'', model: '', vin: '', color: '', thiftDate:'', releaseYear:'', location: '', amount:'', ownerNumber: '', specialMarks:''};

const AntitheftForm = () => {
    const {status} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(errorsInitialState);
    const [images, setImages] = useState([]);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleSubmit = (e) => {
        e.preventDefault();

        let errss = {mark:'', stateNumber:'', model: '', vin: '', color: '', thiftDate:'', releaseYear:'', location: '', amount:'', ownerNumber: '', specialMarks:''};

        let errCnt = 0;

        if(!formData.mark){
            errCnt++;
            errss.mark = 'Заполните это поле';
        }
        if(!formData.stateNumber){
            errCnt++;
            errss.stateNumber = 'Заполните это поле';
        }
        if(!formData.model){
            errCnt++;
            errss.model = 'Заполните это поле';
        }

        if(!formData.amount){
            errCnt++;
            errss.amount = 'Заполните это поле';
        }
        if(!formData.color){
            errCnt++;
            errss.color = 'Заполните это поле';
        }
        if(!formData.location){
            errCnt++;
            errss.location = 'Заполните это поле';
        }
        if(!formData.ownerNumber){
            errCnt++;
            errss.ownerNumber = 'Запишите свой номер телефона';
        }
        if(!formData.releaseYear){
            errCnt++;
            errss.releaseYear = 'Выберите год выпуска';
        }
        if(!formData.thiftDate){
            errCnt++;
            errss.thiftDate = 'Выберите дату кражи';
        }
        if(!formData.vin){
            errCnt++;
            errss.vin = 'Напишите VIN номер';
            setErrors({...errors, vin: 'Напишите VIN номер'});
        }


        if(errCnt === 0){
            dispatch(createAntitheftPost({...formData, selectedFiles: images, amount: formData.amount.replace(/ /g, "")}));
        setErrors(errss);

        }
    }

    const handleChange = (e) => {
        setErrors({...errors, [e.target.name]: ""});
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(!user || !user.result){
            navigate(-1);
        }
    }, [user, navigate])

    const [statusModal, setStatusModal] = useState(false);
    const [statusModalText, setStatusModalText] = useState({title: '', text: ''});
    useEffect(() => {
        if(status){
            switch(status){
                case 200:
                case 201:
                    setStatusModalText({title: 'Успех', text: 'Заявка успешно подана.'})
                    break;
                default:      
                    setStatusModalText({title: 'Ошибка', text: 'Что-то пошло не так. Пожалуйста попробуйте позже.'})
                    break;
            }
            setStatusModal(true);
        }
    }, [status]);
    const closeStatusModal = () => {
        switch(status){
            case 200:
            case 201:
                setFormData(initialState);
                setImages([]);
                dispatch({type: CLEAR_STATE});
                break; 
        }
        setStatusModal(false);
    }
   

    return (
        <div id="antitheft-form">
            <Modal show={statusModal} onHide={closeStatusModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{statusModalText.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{statusModalText.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeStatusModal} >OK</Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Breadcrumbs links={[{name:'Антиугон', link: '/antitheft'}]} currentPage="Подать объявление" />
                <h1>Подать объявление</h1>
                <p>Введите нужную информация о вашем автомобиле</p>

                <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2} lg={2}>
                        <Col>
                            <Input name="mark" value={formData.mark} error={errors.mark} label="Марка" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="stateNumber" value={formData.stateNumber} error={errors.stateNumber} label="Гос номер" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="model" value={formData.model} error={errors.model} label="Модель" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="vin" value={formData.vin} error={errors.vin} label="VIN - номер" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="color" value={formData.color} error={errors.color} label="Цвет" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="thiftDate" value={formData.thiftDate} error={errors.thiftDate} label="Дата кражи" type="date" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="releaseYear" value={formData.releaseYear} error={errors.releaseYear} label="Год выпуска" type="year" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="location" value={formData.location} error={errors.location} label="Место кражи" type="text" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="amount" value={formData.amount} error={errors.amount} label="Сумма вознаграждение в ₸" type="currency" handleChange={handleChange} />
                        </Col>
                        <Col>
                            <Input name="ownerNumber" value={formData.ownerNumber} error={errors.ownerNumber} label="Номер владельца" type="tel" handleChange={handleChange} />
                        </Col>
                    </Row>
                    <Input name="specialMarks" value={formData.specialMarks} label="Особые отметки Вашего автомобиля (например: вмятина на капоте)" type="text" required={false} handleChange={handleChange} />
                    <div className="buttons">
                        <label className="img-picker">
                            <FileBase type="file" id="filePicker" multiple={true}
                                onDone={(data) => {
                                    data.map((img) => {
                                        setImages(prevState => [...prevState, img.base64]);
                                    })
                                }} 
                                />
                            Загрузить фото
                        </label>

                        <Button type="submit" className="submit">Подать объявление</Button>
                    </div>
                    {images.length>0 && (
                        <div className="selectedImages">
                            {images.map((img, key) => (
                                <div className="image" key={key}>
                                    <Image src={img}/>
                                    <span onClick={(e) => {
                                        e.preventDefault();
                                        setImages(images.filter(item => item !== img))
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                                            <path d="M5 5L19 19" stroke="white" strokeWidth="2"/>
                                            <path d="M5 19L19 5" stroke="white" strokeWidth="2"/>
                                        </svg>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Form>
            </Container>
        </div>
    );
};

export default AntitheftForm;