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
    $email: String!){
    updateUser(
        id: $id,
        username: $username,
        email: $email
        ) {
        _id
        username
        email
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
            password: null,
            message: ''
        }
        this.changeAttribute = this.changeAttribute.bind(this);
    }

    checkNull = () => {
         var email = this.state.email;
         var username = this.state.username;
         if(email.trim().length === 0){
            this.setState({message: "Email cannot be blank"});
            return false;
         }
         if(username.trim().length === 0){
            this.setState({message: "Username cannot be blank"});
            return false;
        }
        console.log("Submitted");
        return true;
     }


    changeAttribute(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        return (
            <Query pollInterval={500} query={GET_USERS} variables={{ id: this.props.match.params.id}} >
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
                            <div className="container row" style = {{width: "50%", backgroundColor: "white", borderColor: "black", borderRadius: "10px", borderWidth: "1px", borderStyle: "solid", margin: "auto"}}>
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
                            </div>
                            <div style = {{color: "red", textAlign: "center", fontSize: "15px"}}>{this.state.message}</div>
                            <Mutation mutation={UPDATE_USER} key={data.user._id} onCompleted={() => this.props.history.push('/')}>
                                        {(updateUser, { loading, error }) => (
                                            <div className="container row" style = {{width: "50%"}}>
                                            <form id= "change" name="myForm" style = {{backgroundColor: "white", borderColor: "black", borderRadius: "10px", borderWidth: "1px", borderStyle: "solid", margin: "auto", marginTop: "15px"}} onSubmit={e => {
                                            e.preventDefault();
                                            if(this.checkNull()){
                                                updateUser({ variables: { id: this.props.match.params.id, username: this.state.username, email: this.state.email, password: this.state.password } });            
                                            }}}>
                                            
                                            <div id ="displayedUser" className="form-group" >
                                                <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                                    Username:
                                                </div>
                                                <div className="col s8">
                                                    <input id= "username" value = {this.state.username} name = "username" type="text" style = {{width: "50%"}} className="form-control" placeholder="" onChange = {this.changeAttribute} required/>
                                                </div>
                                            </div>
                                            <div id ="displayedEmail" className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                                    Email:
                                                </div>
                                                <div className="col s8">
                                                    <input id= "email" value = {this.state.email} name = "email" type="email" style = {{width: "50%"}} className="form-control" placeholder="" onChange = {this.changeAttribute} required/>
                                                </div>
                                            </div>
                                            <button type="submit" style = {{backgroundColor: "lightgreen", borderColor: "black", borderRadius: "16px", borderWidth: "1px", margin: "auto", display: "block", marginBottom: "2%"}}>Update information</button>
                                            
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