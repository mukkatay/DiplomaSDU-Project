import React, { useEffect } from "react";
import { Accordion, Card, Col, Container, Image, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../actions/user";
import AntitheftCard from "../Antitheft/AntitheftCard/AntitheftCard";
import Breadcrumbs from "../Breadcrumbs";
import LogbookCard from "../Logbooks/LogbookCard/LogbookCard";
import MarketCard from "../Market/MarketCard/MarketCard";

import NoImg from "../../images/noimg.jpg";
import LocationIcon from '../../images/ic_location.png';
import './styles.scss';
import SubscribeBtn from "../Subscribe/SubscribeBtn";

const UserProfile = () => {
    const {id} = useParams();
    const { user } = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if(currentUser && currentUser.result && currentUser.result._id === id){
            navigate('/profile');
        }
        dispatch(getUser(id));
    }, [id]);   

    return (
        <Container className="userprofile" id="userprofile">
            <Breadcrumbs currentPage='Профиль' />
            {!user ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    <Col sm={4}>
                        <Card className="userinfo">
                            <Card.Body>
                                <div className="avatar avatar-lg">
                                    <Image src={user.avatar ? user.avatar : NoImg} />
                                </div>
                                <p className="username">{user.firstname} {user.lastname}</p>
                                <p className="userid">{user._id}</p>
                                <p className="userlocation"><Image src={LocationIcon} /> {user.country}, {user.city}</p>
                                <p className="subs">Подписчики <span className="count">{user.subscribers.length}</span></p>
                                <p className="subs">Подписки <span className="count">{user.subscriptions.length}</span></p>
                                <SubscribeBtn otherUserId={user._id} user={currentUser?.result} />
                            </Card.Body>
                        </Card>
                        {user.cars && user.cars.length>0 && (
                            <Accordion>
                                {user.cars.map((car, key) => (
                                    <Accordion.Item eventKey={key} key={key}>
                                        <Accordion.Header>{car.carStatus}</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Марка: <span>{car.mark}</span></p>
                                            <p>Модель: <span>{car.model}</span></p>
                                            <p>Поколение: <span>{car.generation}</span></p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        )}
                    </Col>
                    <Col sm={8}>
                        <Tabs defaultActiveKey="logbooks" id="userPosts">
                            <Tab eventKey="logbooks" title="Бортжурнал">
                                {!user.logbooks ? (
                                    <div className="text-center p-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Загрузка...</span>
                                        </Spinner>
                                    </div>
                                ) : user.logbooks.length === 0 ? 
                                    (
                                        <div className='nothing'>
                                            <div className='content'>
                                                <h3>У пользователя еще нет публикации в этом разделе.</h3>
                                            </div>
                                        </div>
                                    )
                                    : user.logbooks.map((post) => (
                                        <LogbookCard logbook={post} key={post._id} isAuthor={true} />
                                    ))
                                }
                            </Tab>
                            <Tab eventKey="marketPosts" title="Магазин">
                                {!user.marketPosts ? (
                                    <div className="text-center p-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Загрузка...</span>
                                        </Spinner>
                                    </div>
                                ) : user.marketPosts.length === 0 ? 
                                    (
                                        <div className='nothing'>
                                            <div className='content'>
                                                <h3>У пользователя еще нет публикации в этом разделе.</h3>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <Row xs={1} md={2} lg={3}>                                 
                                            {user.marketPosts.map((post) => (
                                                <Col key={post._id}>
                                                    <MarketCard post={post} />
                                                </Col>
                                            ))}
                                        </Row> 
                                    )
                                }
                            </Tab>
                            <Tab eventKey="antitheftPosts" title="Антиугон">
                                {!user.antitheftPosts ? (
                                    <div className="text-center p-5">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Загрузка...</span>
                                        </Spinner>
                                    </div>
                                ) : user.antitheftPosts.length === 0 ? 
                                    (
                                        <div className='nothing'>
                                            <div className='content'>
                                                <h3>У пользователя еще нет публикации в этом разделе.</h3>
                                            </div>
                                        </div>
                                    )
                                    : user.antitheftPosts.map((post) => (
                                        <AntitheftCard post={post} key={post._id} />
                                    ))
                                }
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default UserProfile;