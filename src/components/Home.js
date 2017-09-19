import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

  constructor(){
    super();

  function getUserData(dataType){
    return axios.get('/auth/me').then( function (response) {
      console.log(response);
    })
  }

  this.getUserData = getUserData.bind(this);

}

  render(){
    return(
      <div>
        <header className="header_section">

            <h1 className="header_title">Clawbuntu Web Services</h1>
            <hr className="header_line"></hr>
            <h2 className="header_subtitle">A Better Hosting Solution</h2>

            { ! this.props.loggedIn ?
          <a href="http://dev.clawbuntu.com:3005/auth">
            <input className="login_box" type="submit" value="Login" />
          </a>
          :
          <p className="user_box">Welcome,   {this.props.username}</p>
          }

        </header>

        <div className="info_box_parent">

            <div className="flex_children">
              <h3 className="info_box_children">Your Business Is OUR Business</h3>
              <p className="centered_text">You have a business to run. <br></br>Let us take care of your online presence<br></br>so you can do what you do best. </p>
            </div>

            <div className="flex_children">
              <h3 className="info_box_children">What Makes Us The RIGHT Choice?</h3>
              <p className="centered_text">Our open platform<br></br>allows you the freedom<br></br>you need to succeed online.</p><br></br>

              <p className="centered_text">Other hosting companies add “improvements”<br></br>to save the company MONEY.<br></br>We’ve seen anything and everything from<br></br>throttling connections to forced caching.</p><br></br>

              <p className="centered_text">Our business model is simply this:<br></br>Provide a great customer experience</p>
            </div>

            <div className="flex_children">
              <h3 className="info_box_children">Everyone’s Situation Is Different</h3>
              <p className="centered_text">We customize our prices to fit your needs.<br></br>Don’t hesitate to contact us with any<br></br>questions you may have.</p>
            </div>

            <div className="flex_children">
              <h3 className="info_box_children">Who Are We?</h3>
              <p className="centered_text">We are a couple of guys who worked for a<br></br>hosting company.<br></br>We liked the product.<br></br>But we knew we could <span className="underline_text">do it better.</span></p>
            </div>


        </div>

        <footer>
          <h1 className="centered_text">Do you have any questions?  Or are you ready to join?</h1>
        </footer>

      </div>

    )
  }

}
