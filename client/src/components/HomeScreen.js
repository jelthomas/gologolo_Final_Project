import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
query user($id: String!){
	user(id: $id){
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

    logoutHandle = () => {
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render() {
        return (
            <Query pollInterval={50} query={GET_USERS} variables={{ id: this.props.match.params.id}} >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                        <div className="container row">
                            <nav id = "myNav">
                                <div style={{ display: "inline-block", float: "left"}}>
                                    Logo Maker
                                </div>
                                <button className="createNew" onClick = {this.logoutHandle} style={{ cursor: "pointer", display: "inline-block", float: "right", paddingTop: "15px", paddingBottom: "15px" }}>
                                    Logout
                                </button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Link id="homeScreen_buttons" to={`/account/${data.user._id}`}>View Account</Link>
                                </button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingTop: "15px", paddingBottom: "15px" }}>
                                    <Link id="homeScreen_buttons" to={`/create/${data.user._id}`}>Create a New Logo</Link>
                                </button>
                            </nav>
                            <div className="col s4">
                                <h3><u>Logo Library</u></h3>
                                <div className="pre">
                                {data.user.logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer", paddingBottom: "5px" }}>
                                        <Link to={`/view/${data.user._id}/${logo._id}`}>{logo.name}</Link>
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
