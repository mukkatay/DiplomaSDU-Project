import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";

// import homeImg from '../../images/home.png';
import peopleIcon from '../../images/peopleIcon.png';
import logbook from '../../images/logbook.png';
import market from '../../images/market.png';

// antitheft icons
import ATicon1 from '../../images/antitheft-icon-1.png';
import ATicon2 from '../../images/antitheft-icon-2.png';
import ATicon3 from '../../images/antitheft-icon-3.png';
import ATicon4 from '../../images/antitheft-icon-4.png';

import './style.scss';

import { getNews } from '../../actions/news';
import SingleNews from "../News/SingleNews/SingleNews";
import { getVideos } from '../../actions/videos';
import Video from "../Videos/Video/Video";

const Home = () => {
    const dispatch = useDispatch();
    
    const {posts: news} = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getNews([], 1));
    }, [dispatch]);

    const {videos} = useSelector((state) => state.videos);

    useEffect(() => {
        dispatch(getVideos([], 1));
    }, [dispatch]);


    return (
        <>
            <div id="main">
                <div className="left-blur wrapper">
                    <div className="wrap">
                        <div className="h1">Auto Community</div>
                        <div className="p">Авто сообщество нового формата, где представляет все необходимые инструменты, чтобы помочь людям в автомобильной промышленности</div>
                    </div>
                </div>
            </div>
            <Container>
                <div className="block antitheft">
                    <div className="heading">Антиугон</div>
                    <div className="sub-heading">Поиск вашего угнанного автомобиля</div>
                    <Row xs={1} md={2} lg={4} className="mt-5">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className="text-center">
                                        <img className="card-icon" src={ATicon1} />
                                    </div>
                                    <Card.Title>972 +</Card.Title>
                                    <Card.Text>машин было крадено за 2021 год</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className="text-center">
                                        <img className="card-icon" src={ATicon2} />
                                    </div>
                                    <Card.Title>181 +</Card.Title>
                                    <Card.Text>случай в городе Алматы</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className="text-center">
                                        <img className="card-icon" src={ATicon3} />
                                    </div>
                                    <Card.Title>62%</Card.Title>
                                    <Card.Text>машин еще не найдены </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Body>
                                    <div className="text-center">
                                        <img className="card-icon" src={ATicon4} />
                                    </div>
                                    <Card.Title>746 +</Card.Title>
                                    <Card.Text>объявлений было подано </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div className="btn-wrapper">
                        <LinkContainer to="/antitheft">
                            <Button>Оставить заявку</Button>
                        </LinkContainer>
                    </div>
                </div>
                <div className="block news">
                    <div className="heading">Стоит прочитать</div>
                    <div className="sub-heading">Будьте в курсе последних новостей</div>
                    {(!news || news.length === 0) ? (
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Row xs={1} md={2} lg={3}>
                            {news.slice(0, 3).map((singleNews, key) => (
                                <Col key={key}>
                                    <SingleNews news={singleNews} />
                                </Col>
                            ))}
                        </Row>
                    )}

                    <div className="btn-wrapper">
                    <LinkContainer to="/news">
                        <Button>Посмотреть все новости</Button>
                    </LinkContainer>
                    </div>
                </div>
            </Container>
                <div id="logbook-home" className="block">
                    <Container>
                        <div className="d-flex">
                            <div className="w-50">
                                <Image src={logbook} />
                            </div>
                            <div className="w-50">    
                                <Card.Body>
                                    <Card.Title>Бортжурнал</Card.Title>
                                    <Card.Subtitle>Посты, фотографии, истории и коммуникация</Card.Subtitle>
                                    <Card.Text>Исключительно о событиях из жизни соответствующей машины. В нашем бортжурнале вы можете увидеть различные посты наших автолюбителей , а так же необычные факты о машинах.</Card.Text>
                                    <LinkContainer to="logbook">                                
                                        <Button>Перейти</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </div>
                        </div>
                    </Container>
                </div>
            <Container>
                <div className="block video">
                    <div className="heading">Видео</div>
                        <div className="sub-heading">Тест-драйвы, обзоры, ASMR и рекламные ролики</div>
                        {(!videos || videos.length === 0) ? (
                            <div className="text-center p-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </Spinner>
                            </div>
                         ) : (
                            <Row xs={1} lg={2}>
                                {videos.slice(0, 4).map((video) => (
                                    <Col key={video._id} style={{marginBottom: 20 +"px"}}>
                                        <LinkContainer to={`/video/${video._id}`}>
                                            <Card.Img src={`https://i.ytimg.com/vi/${video.videoID}/maxresdefault.jpg`} />
                                        </LinkContainer>
                                    </Col>
                                ))}
                            </Row>
                        )} 

                        <div className="btn-wrapper">
                        <LinkContainer to="/video">
                            <Button>Посмотреть все видео</Button>
                        </LinkContainer>
                    </div>
                </div>
                <div className="block market">
                    <div className="d-flex">
                        <div className="w-50">
                            <Image src={market} />
                        </div>
                        <div className="w-50">    
                            <Card.Body>
                                <Card.Title>Магазин</Card.Title>
                                <Card.Subtitle>Запчасти и необходимые детали</Card.Subtitle>
                                <Card.Text>Каталог нужных запчастей и необходимых деталей для автомобиля. Возможность купить или продавать с любого города.</Card.Text>
                                <LinkContainer to="market">                                
                                    <Button>Все товары</Button>
                                </LinkContainer>
                            </Card.Body>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Home;

