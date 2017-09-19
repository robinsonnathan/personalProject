import React, { Component } from 'react';

export default class ContactUs extends Component {

constructor(props) {
  super(props);

  this.state = {
    visable: false
  };


  this.contactToggle = this.contactToggle.bind(this);

}

contactToggle(){
  let newVis = !this.state.visable
  this.setState({
    visable: newVis
  })
  console.log(this.state.visable)
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  document.body.appendChild(script);

}




render(){
  return(
      <div className="centered">

        <button className="contactForm button" onClick={this.contactToggle}>Contact Us</button>

        { this.state.visable ?
        <form className="contactFormParent" action="http://dev.clawbuntu.com:3005/formsubmit">

          <div>
            <div className="contactFormBox"></div>
            <label for="name">Name:</label>
            <input className="contactForm" type="text" name="name" placeholder="Your name..." required></input><br />

            <label>Email: </label>
            <input className="contactForm" type="email" id="fname" name="email" placeholder="user@example.com" required></input><br />

            <label>Phone: </label>
            <input className="contactForm" type="tel" id="fname" name="phone" placeholder="000-000-0000"></input><br />

            <label> How do you prefer to be contacted? </label><br />
            <select className="contactForm" id="contactMethod" name="contactMethod">
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select><br />



          <div className="g-recaptcha centered" data-sitekey="6LeCkDAUAAAAAC-C1OzXx5FzOSz1IMOiE_7-CQC7"></div>


            <input type="submit" value="Submit"></input>

            </div>
          </form>
          :
          <div></div>
        }

      </div>
    )
  }

}
