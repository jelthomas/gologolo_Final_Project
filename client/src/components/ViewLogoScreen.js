import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
query logo($id: String!, $logoId: String!){
	logo(id: $id, logoId: $logoId){
  	    _id
  	    logos{
    	    _id
    	    name
    	    width
            height
            backgroundColor
            borderColor
            borderWidth
            borderRadius
    	    texts{
                _id
                text
                color
                backgroundColor
                borderColor
                fontSize
                borderRadius
                borderWidth
            }
            images{
                _id
                imageURL
                imageHeight
                imageWidth
            }
  	    }
	}
}
`;

// query logo($logoId: String) {
//     logo(id: $logoId) {
//         _id
//         text
//         color
//         backgroundColor
//         borderColor
//         fontSize
//         borderRadius
//         borderWidth
//         padding
//         margin
//         lastUpdate
//     }
// }

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={50} query={GET_LOGO} variables={{id: "5eb5cbc5be919ea129bddccd",logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                    <div>
                        <div className="container row">
                            <nav id = "myNav">
                                <div style={{ display: "inline-block", float: "left"}}><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                            </nav>
                        </div>
                   
                        <div className="container">
                                <div className="panel panel-default">
                                    <div className="row">
                                    <div className="panel-body" style={{WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)", width:"33.3333%", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "white", paddingLeft: "0.75rem", paddingRight: "0.75rem", display: "inline-table"}}>
                                            <div className="panel-title" style={{textAlign: "center", backgroundColor: "#546e7a", color: "white", marginTop: "0.5rem", marginBottom: "1rem", borderRadius: "5px"}}>
                                                <div style={{paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "30pt"}}>
                                                    View Logo
                                                </div>
                                            </div>
                                            <div style={{backgroundColor: "#546e7a", color:"white", paddingLeft: "20px"}}> 
                                                <div className="row" style={{paddingTop: "20px"}}>
                                                    <div className="form-group">
                                                        <div className="col s4" >Logo Name:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "myPre">
                                                        {data.logo.logos[0].name}
                                                        </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4" >Logo Height:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "myPre">
                                                        {data.logo.logos[0].height}
                                                        </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4" >Logo Width:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "myPre">
                                                        {data.logo.logos[0].width}
                                                        </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4" >Text:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "myPre">
                                                        {/* {data.user.logos.texts.text} */}
                                                        </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Color:</div>
                                                        <div className="col s8" style={{alignItems: "right"}}>
                                                        {/* {data.user.logos.texts.color} */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Background Color:</div>
                                                        <div className="col s8">
                                                        {data.logo.logos[0].backgroundColor}
                                                        </div>
                                                    </div>
                                                </div>   
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Color:</div>
                                                        <div className="col s8">
                                                        {data.logo.logos[0].borderColor}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Font Size:</div>
                                                        <div className="col s8">
                                                        {/* {data.user.logos.texts.fontSize} */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Radius:</div>
                                                        <div className="col s8">
                                                        <pre id = "myPre">{data.logo.logos[0].borderRadius}</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Border Width:</div>
                                                        <div className="col s8">
                                                        <pre id = "myPre">{data.logo.logos[0].borderWidth}</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo.logos[0]._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div style={{marginBottom:"1.5rem", textAlign:"center"}}>
                                                <form 
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo.logos[0]._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo.logos[0]._id}`} className="btn btn-success" style={{backgroundColor: "LimeGreen", fontFamily: "Lexend Exa"}}>Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger" style={{backgroundColor: "red", fontFamily: "Lexend Exa"}}>Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                    <div className="col s8" style={{width:"66.66666%", height: "max-content", marginTop: "0.5rem", marginLeft: "0.5rem"}}> 
                                <div>
                                    <pre className="logo" style={{
                                width: data.logo.logos[0].width,
                                height: data.logo.logos[0].height,
                                background: data.logo.logos[0].backgroundColor,
                                borderColor: data.logo.logos[0].borderColor,
                                borderRadius: data.logo.logos[0].borderRadius,
                                borderWidth: data.logo.logos[0].borderWidth,
                                borderStyle: "solid"}}>
                                     
                                    </pre>
                                </div>
                            </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;