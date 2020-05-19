import React, { Component } from 'react';
import {login} from './UserFunction'
import jwt_decode from 'jwt-decode'

class Login extends Component{
  constructor(){
    super()
    this.state = {
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

  homescreen(){
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    var id = decoded._id;
    this.props.history.push(`/home/${id}`);
  }

  register = () =>{
    this.props.history.push(`/register`);
  }

  onSubmit(e){
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res =>{
      if(res){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        var id = decoded._id;
        this.props.history.push(`/home/${id}`);
      }
      else{
        localStorage.removeItem('usertoken');
        this.setState({email: "", password: "", message: "Login failed. Incorrect email or password"});
      }
    }).catch(err => {
      console.log("Login error: " + err);
      localStorage.removeItem('usertoken');
      this.props.history.push('/');
    })
  }

  render(){
    if(localStorage.usertoken){
      this.homescreen();
    }
    return(
      <div>
      <div className ="container">
        <div className = "row">
          <div className = "col-md-6 mt-5 mx-auto">
            <form onSubmit={this.onSubmit} style = {{backgroundColor: "white", padding: "20px", borderStyle: "solid", borderRadius: "28px"}}> 
            <div style = {{textAlign: "center", backgroundColor: "pink", width: "max-content", margin: "auto", fontSize: "55px", padding: "3px", borderStyle: "solid", borderWidth: "2px", borderRadius: "20px"}}>
                Logo Maker
              </div>
              <h3 style = {{textAlign: "center"}}>
                Please Sign In
              </h3>
              <div style = {{color: "red", textAlign: "center", fontSize: "15px"}}>{this.state.message}</div>
              <div className = "form-group">
                <label htmlFor="email" style = {{color: "black"}}> Email Address:</label>
                <input type = "email" className = "form-control" name = "email" placeholder = "Enter Email" value = {this.state.email} onChange = {this.onChange} required/>
              </div>
              <div className = "form-group">
                <label htmlFor="password" style = {{color: "black"}}> Password:</label>
                <input type = "password" className = "form-control" name = "password" placeholder = "Enter Password" value = {this.state.password} onChange = {this.onChange} required/>
              </div>
              <button type= "submit" style = {{margin: "auto", display: "block", marginTop: "35px", backgroundColor: "limegreen", fontSize: "25px", borderStyle: "solid", borderRadius: "20px", borderColor: "grey", borderWidth: "1px", padding: "10px"}}>
                Sign in
              </button>
              <div style = {{color: "black", textAlign: "center", fontSize: "15px", marginTop: "5px"}} className = "form-group">
                Don't have an account? 
              </div>
              <div style = {{color: "black", textAlign: "center", fontSize: "15px"}} className = "form-group">
                Click below to create one!
              </div>
              <button onClick = {this.register} style = {{margin: "auto", display: "block", backgroundColor: "limegreen", fontSize: "25px", borderStyle: "solid", borderRadius: "20px", borderColor: "grey", borderWidth: "1px", padding: "10px"}}>
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }

}

export default Login;


