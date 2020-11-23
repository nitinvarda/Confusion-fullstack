import React from 'react';
import { Media, Image, Breadcrumb, Card } from 'react-bootstrap'
import { Fade, Stagger } from 'react-animation-components'
import Loading from './LoadingComponent';
import { connect } from 'react-redux'

function RenderLeaders(props) {

    if (props.isLoading) {

        return (
            <Loading />
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>

                </div>

            </div>
        )
    }
    else {

        return (
            <div className="col-12 mt-5">
                <Stagger in>
                    <Fade in>
                        <Media >
                            <Image className="align-self-start mr-3" width={130} height={130} src={'/images/' + props.leader.image} />
                            <Media.Body>
                                <h5>{props.leader.name}</h5>
                                <p>{props.leader.designation}</p>
                                <p>{props.leader.description}</p>
                            </Media.Body>
                        </Media>

                    </Fade>
                </Stagger>
            </div>

        )
    }




}

function About(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <RenderLeaders key={leader._id} leader={leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <Card.Header className="bg-primary text-white">Facts At a Glance</Card.Header>
                        <Card.Body>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <Card.Body className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">

                    {leaders}

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    leaders: state.leaders
})

export default connect(mapStateToProps)(About);    