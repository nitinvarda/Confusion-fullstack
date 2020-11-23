import React, { Component, useEffect, useState } from 'react';

import { Breadcrumb, Button, Form, Row, Col, Card, Modal } from 'react-bootstrap'

import Loading from './LoadingComponent';

import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { connect } from 'react-redux'
import { addFavorite, delComment, delFavorite, dishWithId, addComment } from '../redux/ActionCreators';
import Rating from '../utilities/Rating'

function RenderDish(props) {

    const [isModal, setIsModal] = useState(false)
    const toggleModal = () => {
        setIsModal(!isModal)
    }





    if (props.dish != null) {

        var favorite = []

        if (props.isAuthenticated || props.favorites.favorites.length >= 1) {
            favorite = props.favorites.favorites[0].dishes.filter(item => item._id.toString() === props.dish._id.toString())

        }
        return (
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                <Card>
                    <Card.Img variant='top' src={'/images/' + props.dish.image} alt={props.dish.name} />
                    <Card.Body>
                        {props.login.isAuthenticated ?
                            (favorite.length >= 1 ?
                                (<><Button className="btn btn-light" onClick={() => props.delFavorite(props.dish._id)} ><span className="fa fa-heart fa-2x" ></span></Button>
                                    <Button className="btn btn-light" onClick={() => toggleModal()}><span className="fa fa-comment-o fa-2x"></span></Button></>) :
                                (<><Button className="btn btn-light" onClick={() => props.addFavorite(props.dish._id)}><span className="fa fa-heart-o fa-2x"></span></Button>
                                    <Button className="btn btn-light" onClick={() => toggleModal()}><span className="fa fa-comment-o fa-2x"></span></Button></>)
                            ) :
                            (null)
                        }

                        <p style={{ marginBottom: 10 }}>{props.dish.description}</p>
                    </Card.Body>
                </Card>
                <CommentForm addComment={(id, rating, comment) => props.addComment(id, rating, comment)} dishWithId={props.dishWithId} login={props.login} isModalOpen={isModal} toggleModal={toggleModal} dishId={props.dishId} postComment={props.postComment} />

            </FadeTransform>

        )
    }

    else {
        return (
            <div></div>
        )
    }
}



class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            comment: ''
        }


        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(e) {
        e.preventDefault()


        this.props.addComment(this.props.dishId, this.state.rating, this.state.comment)
        this.props.toggleModal();

    }

    render() {

        if (this.props.login.isAuthenticated) {

            const AlreadyCommented = this.props.dishWithId.dish.comments.filter(comment => comment.author._id.toString() === this.props.login.user._id.toString());


            if (AlreadyCommented.length >= 1) {
                return (
                    <Modal show={this.props.isModalOpen} onHide={this.props.toggleModal}>
                        <Modal.Header closeButton>Submit Comment</Modal.Header>
                        <Modal.Body>
                            <h5>Commented Already</h5>
                        </Modal.Body>
                    </Modal>
                )
            }
            else {
                return (
                    <Modal show={this.props.isModalOpen} onHide={this.props.toggleModal}>
                        <Modal.Header closeButton>Submit Comment</Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Row className="form-group">

                                    <Col >
                                        <Form.Group>
                                            <Form.Label htmlFor="username">Rating</Form.Label>
                                            <Form.Control as='select' onChange={(e) => this.setState({ rating: e.target.value })}  >
                                                <option>Select Rating</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>

                                            </Form.Control>
                                        </Form.Group>

                                    </Col>
                                </Row>

                                <Row className="form-group">

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label htmlFor="username">Username</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Comment" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} />

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button type="submit" value="submit" color="primary" >Submit</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                )
            }
        }
        else {
            return (
                <Modal show={this.props.isModalOpen} onHide={this.props.toggleModal}>
                    <Modal.Header closeButton>Submit Comment</Modal.Header>
                    <Modal.Body>
                        <h5>You need to login to comment</h5>
                    </Modal.Body>
                </Modal>
            )
        }
    }
}


class RenderComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            AlreadyCommented: false

        }
        this.toggleModal = this.toggleModal.bind(this)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {



        if (this.props.comments != null) {
            return (
                <div>
                    <Stagger in>
                        {
                            this.props.comments.map(comment => {
                                if (this.props.login.isAuthenticated) {
                                    if (comment.author._id.toString() === this.props.login.user._id.toString()) {

                                        return (

                                            <Fade in key={comment._id}>
                                                <div className="border border-dark border-3" >
                                                    <div className="d-flex flex-row justify-content-between">


                                                        <ul className="list-unstyled" >
                                                            <Rating text={"rating"} value={comment.rating} color={'orange'} />
                                                            <li>{comment.comment}</li>
                                                            <p>-- {comment.author.username} , {comment.createdAt.substring(0, 10)}</p>
                                                        </ul>
                                                        <Button onClick={() => this.props.delComment(this.props.dishId, comment._id)} variant="outlined-light" ><span className="fa fa-trash fa-2x"></span></Button>
                                                    </div>
                                                </div>
                                            </Fade>

                                        )
                                    }
                                    else {
                                        return (

                                            <Fade in key={comment._id}>
                                                <ul className="list-unstyled">
                                                    <Rating text={"rating"} value={comment.rating} color={'orange'} />
                                                    <li>{comment.comment}</li>
                                                    <p>-- {comment.author.firstname} , {comment.createdAt.substring(0, 10)}</p>
                                                </ul>
                                            </Fade>

                                        )
                                    }
                                }
                                else {
                                    return (

                                        <Fade in key={comment._id}>
                                            <ul className="list-unstyled">
                                                <Rating text={"rating"} value={comment.rating} color={'orange'} />
                                                <li>{comment.comment}</li>
                                                <p>-- {comment.author.firstname} , {comment.createdAt.substring(0, 10)}</p>
                                            </ul>
                                        </Fade>

                                    )
                                }
                            })
                        }

                    </Stagger>



                </div>
            )

        }

        else {
            return (
                <div></div>
            )
        }
    }
}




const Dishdetail = (props) => {


    const dishId = props.match.params.dishId

    useEffect(() => {


        props.dishIdFetch(dishId)

    }, [dishId, props.dishes, props.favorites, props.favorites]);
    if (props.dishWithId.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />

                </div>

            </div>
        )
    }
    else if (props.dishWithId.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishWithId.errMess}</h4>

                </div>

            </div>
        )
    }
    else if (props.dishWithId.dish != null && props.dishWithId.dish.comments != null) {

        return (
            <div className="container pb-5">
                <div className="row">
                    <Breadcrumb>

                        <Breadcrumb.Item href="/menu">Menu</Breadcrumb.Item>
                        <Breadcrumb.Item active> {props.dishWithId.dish.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dishWithId.dish.name}</h3>
                        <hr />
                    </div>

                </div>

                <div className="row">
                    <div className="col-12 col-md-5">
                        <RenderDish
                            delFavorite={(id) => props.delFavorite(id)}
                            addFavorite={(id) => props.addFavorite(id)}
                            favorites={props.favorites}
                            dish={props.dishWithId.dish}
                            login={props.login}
                            dishWithId={props.dishWithId}
                            postComment={props.postComment}
                            dishId={props.dishWithId.dish._id}
                            addComment={(id, rating, comment) => props.addComment(id, rating, comment)}
                        />

                    </div>
                    <div className=" col-12 col-md-5 offset-md-1 ">
                        <h4>Comments</h4>
                        <RenderComments delComment={(dishId, commentId) => props.delComment(dishId, commentId)} dishWithId={props.dishWithId} login={props.login} comments={props.dishWithId.dish.comments} postComment={props.postComment} dishId={props.dishWithId.dish._id} />
                    </div>

                </div>
            </div>
        );
    }
    else {
        return <div></div>
    }
}



const mapStateToProps = (state) => ({
    dishWithId: state.dishWithId,
    login: state.login,
    favorites: state.favorites,
    dishes: state.dishes
})
const mapDispatchToProps = (dispatch) => ({
    dishIdFetch: (id) => dispatch(dishWithId(id)),
    addFavorite: (id) => dispatch(addFavorite(id)),
    delFavorite: (id) => dispatch(delFavorite(id)),
    addComment: (dishId, rating, comment) => dispatch(addComment(dishId, rating, comment)),
    delComment: (dishId, commentId) => dispatch(delComment(dishId, commentId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
