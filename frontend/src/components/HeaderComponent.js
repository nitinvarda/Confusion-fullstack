import React, { useEffect, useState } from 'react';

import {
    Nav, Navbar,
    Modal, Button,
    Form,
    Jumbotron, Container,
    Row, Col,
} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { addReservation, loginUser, logoutUser } from '../redux/ActionCreators'
import { connect } from 'react-redux'


const HeaderComponent = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [guests, setGuests] = useState(0)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState('')

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('savedUser'))

        if (user) {

            setEmail(user.email)
            setPassword(user.password)
            setRemember(user.remember)

        }
    }, [props.loggedIn])



    const toggleModal = () => {

        setIsModalOpen(!isModalOpen)
    }
    const toggleReserveModal = () => {
        setIsReserveModalOpen(!isReserveModalOpen)
    }


    const reserveTable = (e) => {
        e.preventDefault()

        props.addReservation(guests, smoking, date)

        toggleReserveModal()


    }

    const handleLogin = (event) => {

        event.preventDefault()
        if (remember) {
            const details = {
                email: email,
                password: password,
                remember: remember
            }

            localStorage.setItem('savedUser', JSON.stringify(details))

        }
        props.login(email, password)
        toggleModal();


    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="#512da8" variant="dark" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/" className="mr-auto"><img src={'/images/logo.png'}
                        height="30" width="40" alt="Ristorante Con Fusion" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            <NavLink className="nav-link" to="/" >
                                <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>


                            <NavLink className="nav-link" to="/aboutus" >
                                <span className="fa fa-info fa-lg"></span> About
                                </NavLink>


                            <NavLink className="nav-link" to="/menu" >
                                <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>


                            <NavLink className="nav-link" to="/contactus" >
                                <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>

                            <NavLink className="nav-link" to="/favorite" >
                                <span className="fa fa-heart fa-lg"></span> favorites
                                    </NavLink>

                            <NavLink className="nav-link" to="/reservations" >
                                <span className="fa fa-cutlery fa-lg"></span> Reservations
                                    </NavLink>


                        </Nav>
                        {props.loggedIn.isAuthenticated ?
                            (
                                <Nav>
                                    <Nav.Link>
                                        <Button variant="outline-light" onClick={() => props.logout()}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                    </Button>

                                    </Nav.Link>
                                </Nav>
                            ) : (
                                <Nav>
                                    <Nav.Link>
                                        <Button variant="outline-light" onClick={toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                    </Button>
                                    </Nav.Link>
                                </Nav>
                            )}

                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <Jumbotron >
                <Container>
                    <Row>
                        <Col xs={12} md={6}>
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the Wrold's best cuisines, and create a unique fusion experience . Our lipsmacking creations will tickle your culinary senses!</p>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="d-flex  justify-content-center mt-4 ml-2">

                                <Button onClick={toggleReserveModal} size="lg" variant="btn btn-warning " >Reserve Table</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/*  */}
            </Jumbotron>
            <Modal show={isModalOpen} onHide={toggleModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />


                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type='password' placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />


                        </Form.Group>
                        <Form.Group id="forCheckBox">

                            <Form.Check type="checkbox" id="remember" checked={remember} label="Remember Me" onChange={(e) => setRemember(e.target.checked)} />



                        </Form.Group>
                        <Button type="submit" value="submit" color="primary" >Login</Button>
                    </Form>
                </Modal.Body>

            </Modal>

            {props.loggedIn.isAuthenticated ?
                (
                    <Modal show={isReserveModalOpen} onHide={toggleReserveModal} >
                        <Container>
                            <Modal.Header closeButton>
                                <Modal.Title>Table Reservation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={reserveTable}>
                                    <Form.Group>
                                        <Row>
                                            <Col md={4}>
                                                <Form.Label htmlFor="username">Guests</Form.Label>
                                            </Col>
                                            <Col md={8}>

                                                <Form.Control as='select' onChange={(e) => setGuests(e.target.value)}  >
                                                    <option>Select No. of Persons</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                </Form.Control>
                                            </Col>

                                        </Row>
                                    </Form.Group>
                                    <Form.Group >
                                        <Row>
                                            <Col md={4}>
                                                <Form.Label >Smoking?</Form.Label>
                                            </Col>
                                            <Col md={8}>

                                                <Form.Check

                                                    type='checkbox'
                                                    id="smoking"
                                                    label="Smoking"
                                                    checked={smoking}
                                                    onChange={(e) => setSmoking(e.target.checked)}

                                                />
                                                {/* <Form.Check type="checkbox" id="remember" checked={remember} label="Remember Me" onChange={(e) => setRemember(e.target.checked)} /> */}
                                            </Col>


                                        </Row>



                                    </Form.Group>
                                    <Form.Group >
                                        <Row>
                                            <Col md={4}>
                                                <Form.Label >
                                                    Date & Time
                                            </Form.Label>
                                            </Col>
                                            <Col md={8}>
                                                <Form.Control value={date} type="date" onChange={(e) => setDate(e.target.value)} />


                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Button onClick={toggleReserveModal} >Close</Button>
                                    <Button type="submit" value="submit" color="primary" className="ml-3" >Reserve</Button>
                                </Form>
                            </Modal.Body>

                        </Container>

                    </Modal>
                ) :
                (
                    <Modal show={isReserveModalOpen} onHide={toggleReserveModal} >
                        <Container>
                            <Modal.Header closeButton>
                                <Modal.Title>Table Reservation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col>
                                        <p>You need to Login for Reserving Table</p>
                                    </Col>
                                </Row>
                            </Modal.Body>

                        </Container>

                    </Modal>
                )
            }




        </>
    );

}

const mapStateToProps = (state) => ({
    loggedIn: state.login,

})


const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(loginUser(email, password)),
    addReservation: (guests, smoking, date) => dispatch(addReservation(guests, smoking, date)),
    logout: () => dispatch(logoutUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
