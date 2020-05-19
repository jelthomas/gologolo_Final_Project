import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_USERS = gql`
query user($id: String!){
	user(id: $id){
        _id
        username
        email
        password
    }
}
`;

const UPDATE_USER = gql`
mutation updateUser(
    $id: String!,
    $username: String!,
    $email: String!,
    $password: String!){
    updateUser(
        id: $id,
        username: $username,
        email: $email,
        password: $password,
        ) {
        _id
        username
        email
        password
    }
}
`;


class ViewAccountScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            username: null,
            email: null,
            password: null
        }
    }

    checkNull = () => {
        //  var names = ['borderRadius', 'borderWidth', 'logoWidth', 'logoHeight']
        //  var logoName = document.forms["myForm"]['logoName'].value;
        //  for(let i = 0; i < names.length; i++){
        //      var x = document.forms["myForm"][names[i]].value;
        //      if (x === "") {
        //          alert(names[i] + " must be filled out!");
        //          return false;
        //      }
        //  }
        //  if(logoName.trim().length === 0){
        //      alert("Logo Name cannot be empty!");
        //      return false;
        //  }
        console.log("Submitted");
        document.getElementById("change").style.display = "none";
        return false;
     }

     changeUserName = () =>{
        document.getElementById("changeUser").value = this.state.username;
        document.getElementById("displayed").innerHTML = "Username:";
        document.getElementById("change").style.display = "block";
     }
     
     changeEmail = () =>{
        document.getElementById("changeUser").value = this.state.email;
        document.getElementById("displayed").innerHTML = "Email:";
        document.getElementById("change").style.display = "block";
     }
     
     changePassword = () =>{
        document.getElementById("changeUser").value = this.state.password;
        document.getElementById("displayed").innerHTML = "Password:";
        document.getElementById("change").style.display = "block";
     }

     closeForm = () =>{
        console.log("Closed");
        document.getElementById("change").style.display = "none";
    }

    changeAttribute = (val) =>{
        console.log("value: " + val);
        if(document.getElementById("displayed").innerHTML === "Username:"){
            this.setState({username: val});
            console.log("Username changed to: " + this.state.username);
        }
        else if(document.getElementById("displayed").innerHTML === "Email:"){
            this.setState({email: val});
            console.log("Email changed to: " + this.state.email);
        }
        else{
            this.setState({password: val});
            console.log("Password changed to: " + this.state.password);
        }
        document.getElementById("changeUser").value = val;
    }


    render() {
        return (
            <Query pollInterval={50} query={GET_USERS} variables={{ id: this.props.match.params.id}} >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.username === null){

                        this.setState({username: data.user.username, email: data.user.email, password: data.user.password});
                    }
                    return (
                        <div>
                            <div className="container row">
                                <nav id="myNav">
                                    <div>
                                        <Link style={{color:"white", display: "inline-block", float: "left"}} to="/">Home</Link>
                                    </div>
                                </nav>
                                <div style={{textAlign: "center", margin: "auto"}}>
                                    <h3><u>User Credentials:</u></h3>
                                </div>
                            </div>
                            <div className="container row" style = {{width: "50%"}}>
                                <div className = "col s4" style = {{textAlign: "left", maxWidth: "max-content"}}>
                                    <div>
                                        <div style = {{fontSize: "24pt"}}><b>Username:</b></div>
                                        <div style = {{fontSize: "24pt"}}><b>Email:</b></div>
                                    </div>
                                </div>
                                <div className = "col s4">
                                    <div style = {{textAlign: "left", maxWidth: "max-content"}}>
                                        <div style = {{fontSize: "24pt", display: "inline"}}>{data.user.username}</div>
                                        <div style = {{fontSize: "24pt"}}>{data.user.email}</div>
                                    </div>
                                </div>
                                <div className = "col s4" style = {{textAlign: "left", maxWidth: "max-content"}}>
                                    <div>
                                        <div style = {{fontSize: "24pt"}}>
                                            <button onClick ={this.changeUserName} style = {{backgroundColor: "lightgreen", borderColor: "black", borderRadius: "16px", borderWidth: "1px"}}>Change</button>
                                        </div>
                                        <div style = {{fontSize: "24pt"}}>
                                            <button onClick ={this.changeEmail} style = {{backgroundColor: "lightgreen", borderColor: "black", borderRadius: "16px", borderWidth: "1px"}}>Change</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Mutation mutation={UPDATE_USER} key={data.user._id} onCompleted={() => this.props.history.push('/')}>
                                        {(updateUser, { loading, error }) => (
                                            <div className="container row" style = {{width: "50%"}}>
                                            <form id= "change" name="myForm" style = {{ display: "none", backgroundColor: "white", borderColor: "black", borderRadius: "10px", borderWidth: "1px", borderStyle: "solid"}} onSubmit={e => {
                                            e.preventDefault();
                                            if(this.checkNull()){
                                            updateUser({ variables: { id: "5eb5cbc5be919ea129bddccd", username: "", email: "", password: "" } });            
                                            }}}>
                                            
                                            <div className="form-group">
                                                <div id ="displayed" className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                                    Username:
                                                </div>
                                                <div className="col s8">
                                                    <input id= "changeUser" type="text" style = {{width: "50%"}} className="form-control" placeholder="" onChange = {e => {this.changeAttribute(e.target.value)}} />
                                                </div>
                                            </div>
                                            <button type="submit" style = {{backgroundColor: "lightgreen", borderColor: "black", borderRadius: "16px", borderWidth: "1px", margin: "auto", display: "block", marginBottom: "2%"}}>Submit</button>
                                            
                                            </form>
                                        </div>
                                        )}
                                    </Mutation>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default ViewAccountScreen;