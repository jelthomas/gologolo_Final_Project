import React, { Component } from 'react';
import {register} from './UserFunction'

class Register extends Component{
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      message: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  login = () =>{
    this.props.history.push('/')
  }

  onSubmit(e){
    e.preventDefault();
    if(this.state.username.trim().length === 0){
      this.setState({message: "Username cannot be blank!"});
      return;
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    register(user).then(res =>{
      console.log("Registered!");
      this.props.history.push('/')
    }).catch(err => {
      console.log("Registration error: " + err);
    })
  }

  render(){
    return(
      <div>
        <div className ="container">
          <div className = "row">
            <div className = "col-md-6 mt-5 mx-auto">
              <form onSubmit={this.onSubmit} style = {{backgroundColor: "white", padding: "20px", borderStyle: "solid", borderRadius: "28px"}}> 
                <h3 style = {{textAlign: "center"}}>
                  Register Account
                </h3>
                <div style = {{color: "red", textAlign: "center", fontSize: "15px"}}>{this.state.message}</div>
                <div className = "form-group">
                  <label htmlFor="username" style = {{color: "black"}}> Username:</label>
                  <input type = "text" className = "form-control" name = "username" placeholder = "Enter Username" value = {this.state.username} onChange = {this.onChange} required/>
                </div>
                <div className = "form-group">
                  <label htmlFor="email" style = {{color: "black"}}> Email Address:</label>
                  <input type = "email" className = "form-control" name = "email" placeholder = "Enter Email" value = {this.state.email} onChange = {this.onChange} required/>
                </div>
                <div className = "form-group">
                  <label htmlFor="password" style = {{color: "black"}}> Password:</label>
                  <input type = "password" className = "form-control" name = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {this.onChange} required/>
                </div>
                <button type= "submit" style = {{margin: "auto", display: "block", marginTop: "35px", backgroundColor: "limegreen", fontSize: "25px", borderStyle: "solid", borderRadius: "20px", borderColor: "grey", borderWidth: "1px", padding: "10px"}}>
                  Create Account
                </button>
                <button onClick = {this.login} style = {{margin: "auto", display: "block", marginTop: "5px", backgroundColor: "limegreen", fontSize: "25px", borderStyle: "solid", borderRadius: "20px", borderColor: "grey", borderWidth: "1px", padding: "10px"}}>
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Register;


