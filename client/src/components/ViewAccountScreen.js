import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
{
    user(id:"5eb5cbc5be919ea129bddccd"){
        _id
        username
        email
        password
    }
  }
`;

class ViewAccountScreen extends Component {

    render() {
        return (
            <Query pollInterval={50} query={GET_USERS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    //data.logos.sort((a, b) => (b.lastUpdate > a.lastUpdate)? 1:-1);
                    // for(let i=0; i < data.logos.length; i++){
                    //     if(data.logos[i].text.length >= 30){
                    //         data.logos[i].text = data.logos[i].text.substring(0, 30) + " ...";
                    //     }
                    // }
                    return (
                        <div>
                            <div className="container row">
                                <nav>
                                    <div>
                                        <Link style={{color:"white", display: "inline-block", float: "left"}} to="/">Home</Link>
                                    </div>
                                </nav>
                                <div style={{textAlign: "center", margin: "auto"}}>
                                    <h3><u>User Credentials:</u></h3>
                                </div>
                            </div>
                            <div className="container row">
                                <div style={{backgroundColor: "white", margin: "auto", width: "inherit"}}>
                                    <div style={{textAlign: "left"}}>
                                        <div style={{display: "inline-block"}}>
                                            <h1>Username:</h1>
                                        </div>
                                        <div style={{display: "inline-block"}}>
                                            <h1>{data.user.username}</h1>
                                        </div>
                                    </div>
                                    <div style={{textAlign: "left"}}>
                                        <h1 style={{display: "inline"}}>Email:</h1>
                                        <h1 style={{display: "inline"}}>{data.user.email}</h1>
                                    </div>
                                    <div>
                                        <h1 style={{display: "inline", textAlign: "left"}}>Password:</h1>
                                        <h1 style={{display: "inline", textAlign: "center"}}>{data.user.password}</h1>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default ViewAccountScreen;