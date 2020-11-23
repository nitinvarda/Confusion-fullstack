import React, { Component } from 'react';



import MainComponent from './components/MainComponent'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import Footer from './components/FooterComponent'

const store = ConfigureStore();
class App extends Component {



  render() {
    return (
      <Provider store={store}>

        <BrowserRouter>
          <div className="MainApp">


            <div className="App">

              <MainComponent />
            </div>
            <Footer />
          </div>
        </BrowserRouter>

      </Provider>

    )
  }

}

export default App;
