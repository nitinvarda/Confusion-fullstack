import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'
import { delFavorite } from '../redux/ActionCreators'
import Loading from './LoadingComponent'

const FavoriteComponent = (props) => {

    useEffect(() => {

    }, [props.favorites])
    if (props.favorites.favorites.length >= 1) {

        if (props.favorites.favorites[0].dishes.length >= 1) {
            if (props.favorites.isLoading) {
                return (
                    <Container className="d-flex flex-row justify-content-center mt-5">
                        <Row>

                            <Loading />
                        </Row>

                    </Container>
                )
            }
            else if (props.favorites.errMess) {
                return (
                    <Container>
                        <Row>
                            <Col >
                                {props.favorites.errMess}
                            </Col>
                        </Row>
                    </Container>
                )
            }
            else {

                return (
                    <Container className="my-5">

                        {props.favorites.favorites[0].dishes.map(fav => (
                            <Row className="mb-4" key={fav._id} >

                                <Col xs={2} md={2}>
                                    <Image className="align-self-start mr-3" width={100} height={100} src={'/images/' + fav.image} />

                                </Col>
                                <Col xs={10} md={10}>





                                    <div >
                                        <h5>{fav.name}</h5>
                                        <Button onClick={() => props.delFavorite(fav._id)} variant="outline bg-danger text-light">Delete</Button>


                                    </div>
                                </Col>


                            </Row>
                        ))}

                    </Container>
                );
            }
        }
        else {
            return (
                <Container className="my-5">
                    <Row>
                        <Col>
                            <h3>No Favorites Added</h3>
                        </Col>
                    </Row>
                </Container>
            )

        }
    }
    else {
        return (
            <Container className="my-5">
                <Row>
                    <Col>
                        <h3>Please login to view favorites</h3>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites

})

const mapDispatchToProps = (dispatch) => ({
    delFavorite: (id) => dispatch(delFavorite(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteComponent);
