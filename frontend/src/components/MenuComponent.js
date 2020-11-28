import React from 'react';
import { Card, Breadcrumb, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';

import { connect } from 'react-redux'

function RenderMenuItem({ dish, match }) {

    return (
        <Card  >


            <Link to={`/dish/${dish._id}`} style={{ color: 'white', textDecoration: 'none' }}>

                <Card.Img width="100%" src={"/images/" + dish.image} alt={dish.name} />
                <Card.ImgOverlay style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >

                    <Card.Title style={{ textAlign: 'center' }} >{dish.name}</Card.Title>
                    <Card.Text >{dish.description}</Card.Text>
                </Card.ImgOverlay>

            </Link>
        </Card>
    );

}

const Menu = ({ dishes, onClick, }) => {

    if (dishes.isLoading) {
        return (
            <Container className="d-flex flex-row justify-content-center mt-5">
                <Row>

                    <Loading />
                </Row>

            </Container>
        )
    }
    else if (dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{dishes.errMess}</h4>

                </div>

            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Menu</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>

                </div>
                <div className="row pb-5">

                    {dishes.dishes.map(dish => (
                        <div key={dish._id} className="col-12 col-md-5 mt-5">
                            <RenderMenuItem dish={dish} />

                        </div>

                    ))}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    dishes: state.dishes
})

export default connect(mapStateToProps)(Menu)
