import React, { Component } from 'react';
import axios from 'axios';

import './css/reset.css';
import './css/App.css';


import Home from './components/Home'
import ContactUs from './components/ContactUs'

class App extends Component {

  constructor(){
    super();

    this.state = {
      loggedIn: false,
      username: ''
    }
  }

   componentWillMount(){
    //### ES8 async -add async before function- ### //
    // let user = await axios.get('/auth/me');


    axios.get('/auth/me')
    .then( (user)=>{
      if(user.data){
        this.setState({
          loggedIn: true,
          username: user.data.displayName
        })
      }
    }), (err)=>{
          console.log(err)
        }

  }


  render() {
    return (
      <div>
        <div className="background_image">
        </div>
        {console.log("Logged in: ",this.state.loggedIn)}
        <Home username={this.state.username} loggedIn={this.state.loggedIn} className="others" />
        <ContactUs className="others" />

      </div>
    );
  }
}

export default App;
