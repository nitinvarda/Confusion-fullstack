import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import Header from './HeaderComponent';
import Menu from './MenuComponent';

import Home from './HomeComponent';
import DishdetailComponent from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'

import { connect } from 'react-redux';
import { fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators'


import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FavoriteComponent from './FavoriteComponent'
import ReservationComponent from './ReserationComponent'

class Main extends Component {



    componentDidMount() {
        this.props.fetchDishes();

        this.props.fetchPromos();
        this.props.fetchLeaders()
    }


    render() {



        return (
            <div className="App">
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
                        <Switch>
                            <Route path="/" component={Home} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Route path="/dish/:dishId" exact component={DishdetailComponent} />
                            <Route path="/favorite" exact component={FavoriteComponent} />
                            <Route path="/reservations" exact component={ReservationComponent} />
                            <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading} leadersErrMess={this.props.leaders.errMess} />} />
                            <Redirect to="/" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>



            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,



    }
}

const mapDispatchToProps = (dispatch) => ({

    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },


})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
