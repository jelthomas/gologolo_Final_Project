import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

class LoginScreen extends Component {
  constructor() {
    super();

    // WE'LL MANAGE THE UI CONTROL
    // VALUES HERE
    this.state = {
        username: '',
        password: ''
    }
  }


  loginHandler = () =>{
      var user = { "username" : this.state.username,
                    "password" : this.state.password }
      AuthService.login(user).then(data=>{
        console.log(data);
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
            <form onSubmit = {this.loginHandler}>
              <h3> Sign In Here</h3>
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

export default LoginScreen;