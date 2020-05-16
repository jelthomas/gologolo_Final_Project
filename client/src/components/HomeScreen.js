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
        logos{
            _id
            name
        }
    }
  }
`;

class HomeScreen extends Component {

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
                        <div className="container row">
                            <nav id = "myNav">
                                <div style={{ display: "inline-block", float: "left"}}>
                                    Logo Maker
                                </div>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Link id="homeScreen_buttons" to="/create">Logout</Link>
                                </button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Link id="homeScreen_buttons" to={`/account/${data.user._id}`}>View Account</Link>
                                </button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Link id="homeScreen_buttons" to="/create">Create a New Logo</Link>
                                </button>
                            </nav>
                            <div className="col s4">
                                <h3><u>Logo Library</u></h3>
                                <div className="pre">
                                {data.user.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer", paddingBottom: "5px" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.name}</Link>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="col s8">
                                <h3>Welcome {data.user.username}!</h3>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
