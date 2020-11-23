import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { delReservation } from '../redux/ActionCreators';
import Loading from './LoadingComponent'

const ReserationComponent = (props) => {

    useEffect(() => {

    }, [props.reservations])
    if (props.login.isAuthenticated) {
        if (props.reservations.reservations.length >= 1 && props.reservations.reservations[0].reservations.length >= 1) {
            if (props.reservations.isLoading) {
                return (
                    <Container className="d-flex flex-row justify-content-center">
                        <Row>

                            <Loading />
                        </Row>

                    </Container>
                )
            }
            else {
                return (
                    <Container className="my-5">
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>No. Of Persons</th>
                                        <th>Smoking</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                {props.reservations.reservations[0].reservations.map((reservation, index) => (
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{reservation.date}</td>
                                            <td>{reservation.guests}</td>
                                            <td>{reservation.smoking ? "true" : "false"}</td>
                                            <td><Button variant='danger' onClick={() => props.delReservation(reservation._id)}>Delete</Button></td>
                                        </tr>
                                    </tbody>
                                ))}

                            </Table>
                        </Row>
                    </Container>
                );
            }
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h5>No reservations yet</h5>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
    else {
        return (
            <Container>
                <Row>
                    <Col className="my-5">
                        <h5>Please Login see Reservations</h5>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    reservations: state.reservations,
    login: state.login
})

const mapDispatchToProps = (dispatch) => ({
    delReservation: (id) => dispatch(delReservation(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(ReserationComponent);
