import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class RegisterScreen extends Component {
  constructor() {
    super();

    // WE'LL MANAGE THE UI CONTROL
    // VALUES HERE
    this.state = {
        username: '',
        password: ''
    }
  }


  registerHandler = (e) =>{
      e.preventDefault();
      axios.post('/', {
        username: this.state.username,
        password: this.state.password
      }).then(response =>{
        console.log(response);
        if(response.data){
          console.log("Registered successfully");
          this.setState({redirectTo: '/login'});
        }
        else{
          console.log("Error");
        }
      }).catch(error =>{
        console.log("Sign-up error server side: " + error);
      });

  }

  usernameChange = (e) =>{
    console.log("Changing username to: " + e);
    this.setState({username: e});
  }

  passwordChange = (e) =>{
    console.log("Changing username to: " + e);
    this.setState({password: e});
  }



  render() {
      return (
        <div>
            <form onSubmit = {e => this.registerHandler(e)}>
              <h3> Register Here</h3>
              <div>Username: </div>
              <input type = "text" onChange = {e=> this.usernameChange(e.target.value)} placeholder = "Enter Username" value = {this.state.username}/>
              <div>Password: </div>
              <input type = "text" onChange = {e=> this.passwordChange(e.target.value)} placeholder = "Enter Password" value = {this.state.password}/>
              <button type = "submit">Login</button>
            </form>
        </div>
      )
  }
}

export default RegisterScreen;