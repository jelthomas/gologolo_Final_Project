import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation} from 'react-apollo';
import html2canvas from 'html2canvas';

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
            margin
            padding
    	    texts{
                _id
                text
                color
                fontSize
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

const DELETE_LOGO = gql`
  mutation deleteLogo($id: String!, $logoId: String!) {
    deleteLogo(id: $id, logoId: $logoId) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            message: ''
        }
    }

    textPopulate = (text, color, fontSize) =>{
        document.getElementById("textText").innerHTML = text;
        document.getElementById("textColor").innerHTML = color;
        document.getElementById("textFontSize").innerHTML = fontSize;
    }

    imagePopulate = (url, height, width) =>{
        document.getElementById("imageURL").innerHTML = url;
        document.getElementById("imageHeight").innerHTML = height;
        document.getElementById("imageWidth").innerHTML = width;
    }

    export = () =>{
        this.setState({message: "Scroll down and right click on the image to save!"})
        html2canvas(document.getElementById('export'), { letterRendering: 1, allowTaint : true}).then(function(canvas) {
            canvas.style.textAlign = "center";
            canvas.style.margin = "auto";
            canvas.id = "canvas";
            document.body.appendChild(canvas);
           });
    }

    hide = () =>{
        if(document.getElementById("canvas")){
            var div = document.getElementById("canvas");
            div.parentNode.removeChild(div);
        }
    }

    render() {
        return (
            <Query pollInterval={50} key = {this.props.match.params.id} query={GET_LOGO} variables={{id: this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return (
                    <div>
                        <div className="container row">
                            <nav id = "myNav">
                                <div onClick = {() => this.hide()} style={{ display: "inline-block", float: "left"}}><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingBottom: "15px", paddingTop: "15px"  }} onClick={this.export}>Export Logo</button>
                            </nav>
                        </div>
                        <div style = {{color: "blue", fontSize: "30px", margin: "auto", textAlign: "center"}}>{this.state.message}</div>
                        <div className="container">
                                <div className="panel panel-default">
                                    <div id = "append" className="row">
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
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Margin:</div>
                                                        <div className="col s8">
                                                        <pre id = "myPre">{data.logo.logos[0].margin}</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Padding:</div>
                                                        <div className="col s8">
                                                        <pre id = "myPre">{data.logo.logos[0].padding}</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4" >Text:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "textText" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on text to view</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Color:</div>
                                                        <div className="col s8" style={{alignItems: "right"}}>
                                                        <pre id = "textColor" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on text to view color</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Font Size:</div>
                                                        <div className="col s8">
                                                        <pre id = "textFontSize" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on text to view font size</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4" >Image URL:</div>
                                                        <div className="col s8" style={{display: "inline-grid"}}>
                                                        <pre id = "imageURL" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on image to view url</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Image Height:</div>
                                                        <div className="col s8" style={{alignItems: "right"}}>
                                                        <pre id = "imageHeight" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on image to view height</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <div className="col s4">Image Width:</div>
                                                        <div className="col s8">
                                                        <pre id = "imageWidth" style = {{fontSize: "11.3pt", color: "white", fontFamily: "Lexend Exa"}}>Click on image to view width</pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo.logos[0]._id} onCompleted={() => this.props.history.push('/')}>
                                        {(deleteLogo, { loading, error }) => (
                                            <div style={{marginBottom:"1.5rem", textAlign:"center"}}>
                                                <form 
                                                    onSubmit={e => {
                                                        this.hide();
                                                        e.preventDefault();
                                                        deleteLogo({ variables: { id: this.props.match.params.id, logoId: this.props.match.params.logoId } });
                                                    }}>
                                                    <Link onClick = {() => this.hide()} to={`/edit/${data.logo._id}/${data.logo.logos[0]._id}`} className="btn btn-success" style={{backgroundColor: "LimeGreen", fontFamily: "Lexend Exa"}}>Edit</Link>&nbsp;
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
                                    <div className="col s8" id = "export" style={{width:"66.66666%", height: "max-content", width: "max-content", marginTop: "0.5rem", marginLeft: "0.5rem"}}> 
                                    <pre className="logo" style={{
                                        width: data.logo.logos[0].width,
                                        height: data.logo.logos[0].height,
                                        background: data.logo.logos[0].backgroundColor,
                                        borderColor: data.logo.logos[0].borderColor,
                                        borderRadius: data.logo.logos[0].borderRadius,
                                        borderWidth: data.logo.logos[0].borderWidth,
                                        borderStyle: "solid",
                                        overflowX: "hidden", 
                                        overflowY: "hidden",
                                        flexWrap: "wrap",
                                        display: "flex",
                                        padding: data.logo.logos[0].padding,
                                        margin: data.logo.logos[0].margin}}>
                                     {data.logo.logos[0].texts.map((single_text, index) => (
                                            <div className="profile-pic">
                                                <div onClick = {() => this.textPopulate(single_text.text, single_text.color, single_text.fontSize)} style = {{color: single_text.color, fontSize: single_text.fontSize + "px" }}>
                                                    {single_text.text}
                                                </div>
                                            </div>
                                        ))}
                                        {data.logo.logos[0].images.map((single_image, index) => (
                                            <div className="profile-pic">
                                                <img onClick = {() => this.imagePopulate(single_image.imageURL, single_image.imageHeight, single_image.imageWidth)} src = {single_image.imageURL} alt = "error" height = {single_image.imageHeight} width = {single_image.imageWidth}>
                                                </img>
                                            </div>
                                        ))}
                                    </pre>
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