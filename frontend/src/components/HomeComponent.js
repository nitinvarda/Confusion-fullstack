import React from 'react';
import Loading from './LoadingComponent';

import { FadeTransform } from 'react-animation-components'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

function RenderCard({ item, isLoading, errMess }) {

    if (item) {
        if (isLoading) {
            return (
                <Loading />
            )
        }
        else if (errMess) {
            return (
                <h4>{errMess}</h4>
            )
        }
        else {

            return (
                <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                    <Card>
                        <Card.Img src={'/images/' + item.image} alt={item.name} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            {item.designation ? <Card.Subtitle className="my-3">{item.designation}</Card.Subtitle> : null}
                            <Card.Text>{item.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </FadeTransform>

            )
        }
    }
    else {
        return null
    }

}

const HomeComponent = ({ dishes, promotions, leaders }) => {



    if (dishes.dishes.length >= 1 && promotions.promotions.length >= 1 && leaders.leaders.length >= 1) {


        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md my-3">
                        <RenderCard item={dishes.dishes[0]} isLoading={dishes.isLoading} errMess={dishes.errMess} />

                    </div>
                    <div className="col-12 col-md my-3">
                        <RenderCard item={promotions.promotions[0]} isLoading={promotions.isLoading} errMess={promotions.errMess} />

                    </div>
                    <div className="col-12 col-md my-3">
                        <RenderCard item={leaders.leaders[0]} isLoading={leaders.isLoading} errMess={leaders.errMess} />

                    </div>

                </div>

            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}
const mapStateToProps = (state) => ({
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions
})
export default connect(mapStateToProps)(HomeComponent);
