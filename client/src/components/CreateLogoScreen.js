import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { Modal, Button} from 'react-materialize';
import TextInput from 'react-materialize/lib/TextInput';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import TextObject from "./TextObject";


const ADD_LOGO = gql`
    mutation AddLogo(
        $id: String!,
        $name: String!,
        $height: Int!,
        $width: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!) {
        addLogo(
            id: $id,
            name: $name,
            height: $height,
            width: $width,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth
            ) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            name: "My Default Logo Name",
            height: 200,
            width: 200,
            backgroundColor: "#FF0000",
            borderColor: "#FFFFFF",
            borderRadius: 0,
            borderWidth: 0,
            textsArray: [],
            currentIndex: 0
        }
    }


    handleNameChange = (event) =>{
        console.log(this.state.name);
        this.setState({name: event.target.value, width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, 
            borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray});
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({borderRadius: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderWidth: this.state.borderWidth, backgroundColor: this.state.backgroundColor, textsArray: this.state.textsArray});
    }

    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthChange to " + event.target.value);
        this.setState({borderWidth: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderRadius: this.state.borderRadius, backgroundColor: this.state.backgroundColor, textsArray: this.state.textsArray});
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackGroundColorChangeComplete to " + event.target.value);
        this.setState({backgroundColor: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray});
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChangeComplete to " + event.target.value);
        this.setState({borderColor: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray});
    }

    handleHeightChange = (event) => {
        if(event.target.value <= 650){
            console.log("handleLogoHeightChange to " + event.target.value);
            this.setState({height: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, width: this.state.width, 
                borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray});
        }
    }

    handleWidthChange = (event) => {
        if(event.target.value <= 650){
            console.log("handleLogoWidthChange to " + event.target.value);
            this.setState({width: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, borderColor: this.state.borderColor, 
                height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray});
            }
    }

    checkNull = () => {
       // var names = ['text', 'fontSize', 'borderRadius', 'borderWidth', 'padding', 'margin']
        var names = ['borderRadius', 'borderWidth', 'logoWidth', 'logoHeight']
        var logoName = document.forms["myForm"]['logoName'].value;
        for(let i = 0; i < names.length; i++){
            var x = document.forms["myForm"][names[i]].value;
            if (x === "") {
                alert(names[i] + " must be filled out!");
                return false;
            }
        }
        if(logoName.trim().length === 0){
            alert("Logo Name cannot be empty!");
            return false;
        }
        return true;
    }

    addText = () => {
        var text = new TextObject();
        var newTexts = this.state.textsArray.concat(text);
        this.setState({textsArray: newTexts}); //Add new default text object to array
    }

    handleClick = (index) =>{
        document.getElementById("formTextInput").value = this.state.textsArray[index].text;
        document.getElementById("formColorInput").value = this.state.textsArray[index].getColor();
        document.getElementById("formFontSizeInput").value = parseInt(this.state.textsArray[index].fontSize,10);
        console.log("Opened");
        document.getElementById("asd").style.display = "block";
        this.setState({currentIndex: index});
    }

    closeForm = () =>{
        console.log("Closed");
        document.getElementById("asd").style.display = "none";
    }

    handleTextChange = (val) =>{
        console.log("Changing the text of text #" + this.state.currentIndex + " to: " + val);
        let texts = this.state.textsArray;
        texts[this.state.currentIndex].text = val;
        this.setState({textsArray: texts}, () => {document.getElementById("formTextInput").value = this.state.textsArray[this.state.currentIndex].text});
    }

    handleTextColorChange = (val) =>{
        console.log("Changing the color of text #" + this.state.currentIndex + " to: " + val);
        let texts = this.state.textsArray;
        texts[this.state.currentIndex].color = val;
        this.setState({textsArray: texts}, () => {document.getElementById("formColorInput").value = this.state.textsArray[this.state.currentIndex].color});
    }

    handleTextFontSizeChange = (val) =>{
        let v = parseInt(val,10);
        if((v <= 100) && (v >= 4)){
            console.log("Changing the font size of text #" + this.state.currentIndex + " to: " +  v);
            let texts = this.state.textsArray;
            texts[this.state.currentIndex].fontSize = v;
            this.setState({textsArray: texts}, () => {document.getElementById("formFontSizeInput").value = v});
        }
    }

    deleteText = () =>{
        console.log("About to delete text #" + this.state.currentIndex);
        var updated = this.state.textsArray;
        updated.splice(this.state.currentIndex,1);
        this.closeForm();
        this.setState({textsArray: updated, currentIndex: 0});
    }

    render() {
        let name, width, height, backgroundColor, borderWidth, borderColor, borderRadius;

        const styles = {
            container: {
                name: this.state.name,
                width: this.state.width +  "px",
                height: this.state.height + "px",
                backgroundColor: this.state.backgroundColor,
                borderWidth: this.state.borderWidth + "px",
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderStyle: "solid",
                overflowX: "hidden", 
                overflowY: "hidden",
                flexWrap: "wrap",
                display: "flex"
            }
        }

        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                <div>
                    <div className="container row">
                            <nav onClick = {this.closeForm} id = "myNav">
                                <div style={{ display: "inline-block", float: "left"}}><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingBottom: "15px", paddingTop: "15px"  }} onClick={this.addText}>Add New Text</button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingBottom: "15px", paddingTop: "15px"  }} onClick = {this.addImage}>Add New Image</button>
                            </nav>
                    </div>
                    <div className="container">
                    <div style = {{position: "absolute", marginLeft: "68%", zIndex: "1"}}>
                        <div id="asd" style = {{display: "none", backgroundColor: "white", borderRadius: "15px", borderStyle: "solid", borderWidth: "2px"}}>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Text:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formTextInput" type="text" style = {{color: "black"}} placeholder=""  onChange = {e => this.handleTextChange(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Text Color:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formColorInput" type="color" style = {{width: "50%"}} name="logoName" className="form-control" name="logoName" ref={node => {
                                                name = node;}} placeholder="" onChange = {e => this.handleTextColorChange(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Font Size:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formFontSizeInput" min = '4' max = '100' type="number" style = {{color: "black", width: "50%"}} name="logoName" className="form-control" name="logoName" ref={node => {
                                                name = node;}} placeholder="" onChange = {e => this.handleTextFontSizeChange(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div style={{paddingBottom: "5px"}}>
                                    <div className="form-group" style={{margin: "auto", textAlign: "center"}}>
                                        <button onClick = {this.deleteText} style = {{borderRadius: "8px", backgroundColor: "red", color: "black"}}>
                                            Delete this text
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                        <div className="panel panel-default">
                            <div className="row">
                            <div onClick = {this.closeForm} className="panel-body" style={{WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)", width:"33.3333%", display: "inline-table", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "white", paddingLeft: "0.75rem", paddingRight: "0.75rem"}}>
                                <form name="myForm" onSubmit={e => {
                                    e.preventDefault();
                                    if(this.checkNull()){
                                    addLogo({ variables: { id: "5eb5cbc5be919ea129bddccd", name: name.value, height: parseInt(height.value), width: parseInt(width.value), backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value) } });
                                    name.value = "";
                                    height.value = "";
                                    width.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";    
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    }
                                }}>
                                    <div className="panel-title" style={{textAlign: "center", backgroundColor: "#546e7a", color: "white", marginTop: "0.5rem", marginBottom: "1rem", borderRadius: "5px"}}>
                                        <div style={{paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "30pt"}}>
                                            Create Logo
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: "#546e7a", color:"white", paddingLeft: "20px"}}> 
                                        <div className="row" style={{paddingTop: "20px"}}>
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Name:</div>
                                                <div className="col s8">
                                                    <input type="text" style = {{color: "white"}} name="logoName" className="form-control" name="logoName" ref={node => {
                                                        name = node;
                                                    }} placeholder={this.state.name} value = {this.state.name} onChange = {this.handleNameChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Height:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="logoHeight" min="10" max="650" className="form-control" name="logoHeight" ref={node => {
                                                        height = node;
                                                    }} placeholder={this.state.height} value = {this.state.height} onChange = {this.handleHeightChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Width:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="logoWidth" min="10" max="650" className="form-control" name="logoWidth" ref={node => {
                                                        width = node;
                                                    }} placeholder={this.state.width} value = {this.state.width} onChange = {this.handleWidthChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Background Color:</div>
                                                <div className="col s8">
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder={this.state.backgroundColor} onChange={this.handleBackgroundColorChange} value={this.state.backgroundColor}/>
                                                </div>
                                            </div>
                                        </div>   
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Color:</div>
                                                <div className="col s8">
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder={this.state.borderColor} onChange={this.handleBorderColorChange} value={this.state.borderColor}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Radius:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="borderRadius" min="0" max="200" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder={this.state.borderRadius} onChange={this.handleBorderRadiusChange} value={this.state.borderRadius}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Width:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="borderWidth" min="0" max="200" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder={this.state.borderWidth} onChange={this.handleBorderWidthChange} value={this.state.borderWidth} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-success" style={{ display: "block", margin: "0 auto", marginBottom: "20px", backgroundColor: "LimeGreen"}}>Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            <div className="col s8" style={{width:"66.66666%", height: "max-content", marginTop: "0.5rem", marginLeft: "0.5rem"}}> 
                                <pre  className="logo" style={ styles.container }>
                                    {this.state.textsArray.map((single_text, index) => (
                                            <div className="profile-pic">
                                                <div id={index} style = {{color: this.state.textsArray[index].getColor(), fontSize: this.state.textsArray[index].getFontSize() }}>
                                                    {single_text.getText()}
                                                </div>
                                                <div className="edit">
                                                    <i style ={{fontSize: "0.9em", verticalAlign: "100%"}} onClick = {() => this.handleClick(index)} class="fa fa-pencil fa-lg"></i>
                                                </div>
                                            </div>
                                        ))}
                                </pre>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;