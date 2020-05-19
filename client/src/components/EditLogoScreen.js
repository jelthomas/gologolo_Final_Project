import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextObject from "./TextObject";
import ImageObject from "./ImageObject";

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

const UPDATE_LOGO = gql`
mutation updateLogo(
    $id: String!,
    $logoId: String!,
    $name: String!,
    $height: Int!,
    $width: Int!,
    $backgroundColor: String!,
    $borderColor: String!,
    $borderRadius: Int!,
    $borderWidth: Int!,
    $margin: Int!,
    $padding: Int!,
    $texts: [textInput]!,
    $images: [imageInput]!) {
    updateLogo(
        id: $id,
        logoId: $logoId,
        name: $name,
        height: $height,
        width: $width,
        backgroundColor: $backgroundColor,
        borderColor: $borderColor,
        borderRadius: $borderRadius,
        borderWidth: $borderWidth,
        margin: $margin,
        padding: $padding,
        texts: $texts,
        images: $images
        ) {
        _id
    }
}
`;

class EditLogoScreen extends Component {
    constructor() {
        super();

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            name: null,
            height: 0,
            width: 0,
            backgroundColor: "",
            borderColor: "",
            borderRadius: 0,
            borderWidth: 0,
            margin: 0,
            padding: 0,
            textsArray: [],
            imagesArray: [],
            currentIndex: 0,
            message: ''
        }
    }

    handleNameChange = (event) =>{
        this.setState({name: event.target.value, width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, 
            borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
    }

    handleMarginChange = (event) =>{
        this.setState({margin: event.target.value, name: this.state.name, width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, 
            borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, padding: this.state.padding});
    }

    handlePaddingChange = (event) =>{

        this.setState({padding: event.target.value, name: this.state.name, width: this.state.width, height: this.state.height, backgroundColor: this.state.backgroundColor, 
            borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin});
    }

    handleBorderRadiusChange = (event) => {
        if(event.target.value <= 500){
            console.log("handleBorderRadiusChange to " + event.target.value);
            this.setState({borderRadius: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
                height: this.state.height, borderWidth: this.state.borderWidth, backgroundColor: this.state.backgroundColor, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
            }
    }

    handleBorderWidthChange = (event) => {
        if(event.target.value <= 500){
            console.log("handleBorderWidthChange to " + event.target.value);
            this.setState({borderWidth: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
                height: this.state.height, borderRadius: this.state.borderRadius, backgroundColor: this.state.backgroundColor, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
        }
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackGroundColorChangeComplete to " + event.target.value);
        this.setState({backgroundColor: event.target.value, borderColor: this.state.borderColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChangeComplete to " + event.target.value);
        this.setState({borderColor: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, width: this.state.width, 
            height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
    }

    handleHeightChange = (event) => {
        if(event.target.value <= 1000){
            console.log("handleLogoHeightChange to " + event.target.value);
            this.setState({height: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, width: this.state.width, 
                borderColor: this.state.borderColor, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
        }
    }

    handleWidthChange = (event) => {
        if(event.target.value <= 1000){
            console.log("handleLogoWidthChange to " + event.target.value);
            this.setState({width: event.target.value, backgroundColor: this.state.backgroundColor, name: this.state.name, borderColor: this.state.borderColor, 
                height: this.state.height, borderRadius: this.state.borderRadius, borderWidth: this.state.borderWidth, textsArray: this.state.textsArray, imagesArray: this.state.imagesArray, margin: this.state.margin, padding: this.state.padding});
            }
    }

    checkNull = () => {
        if(!this.isNotEmpty()){
            alert("Selected text cannot be empty!");
            return false;
        }
        var names = ['borderRadius', 'borderWidth', 'logoWidth', 'logoHeight', 'margin', 'padding']
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
        if(this.isNotEmpty()){
            this.closeImageForm();
            var text = new TextObject();
            var newTexts = this.state.textsArray.concat(text);
            this.setState({textsArray: newTexts}); //Add new default text object to array
        }
    }

    imageExists(url, callback){
        var img = new Image();
        img.onload = function() { callback(true); };
        img.onerror = function() { callback(false); };
        img.src = url;
    }

    addImage = () => {
        var url = document.getElementById("formUrlInput").value;
        var imageUrl = url;
        this.imageExists(imageUrl, (exists) => {
            console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
            var height = document.getElementById("formHeightInput").value;
            var width = document.getElementById("formWidthInput").value;
            var imageExists = exists;
            if(!imageExists){
                window.alert("Image does not exist!");
                document.getElementById("formUrlInput").value = "";
                return null;
            }
            if(isNaN(height) || height < 4 || height > 650){
                window.alert("Height must be a number between 4 and 650");
                document.getElementById("formHeightInput").value = "";
                return null;
            }
            if(isNaN(width) || width < 4 || width > 650){
                window.alert("Width must be a number between 4 and 650");
                document.getElementById("formWidthInput").value = "";
                return null;
            }
            var image = new ImageObject(url, height, width);
            var newImages = this.state.imagesArray.concat(image);
            this.setState({imagesArray: newImages}); //Add new image object to array
            this.closeImageForm();
        });
    }

    editImage = () =>{
        var url = document.getElementById("formUrlInput").value;

        var imageUrl = url;
        this.imageExists(imageUrl, (exists) => {
            console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
            var height = document.getElementById("formHeightInput").value;
            var width = document.getElementById("formWidthInput").value;
            var imageExists = exists;
            if(!imageExists){
                window.alert("Image does not exist!");
                document.getElementById("formUrlInput").value = "";
                return null;
            }
            if(isNaN(height) || height < 4 || height > 650){
                window.alert("Height must be a number between 4 and 650");
                document.getElementById("formHeightInput").value = "";
                return null;
            }
            if(isNaN(width) || width < 4 || width > 650){
                window.alert("Width must be a number between 4 and 650");
                document.getElementById("formWidthInput").value = "";
                return null;
            }
            var updatedImages = this.state.imagesArray;
            updatedImages[this.state.currentIndex].imageURL = url;
            updatedImages[this.state.currentIndex].imageHeight = height;
            updatedImages[this.state.currentIndex].imageWidth = width;
            this.setState({imagesArray: updatedImages}); //Edit image object and setState for images array
            this.closeImageForm();
        });
    }


    imageForm = () =>{
        if(this.isNotEmpty()){
            document.getElementById("formUrlInput").value = "";
            document.getElementById("formHeightInput").value = "";
            document.getElementById("formWidthInput").value = "";
            document.getElementById("addImage").style.display = "block";
            document.getElementById("deleteImage").style.display = "none";
            document.getElementById("imageForm").style.display = "block";
        }
    }


    handleClick = (index) =>{
        if(this.isNotEmpty()){
            this.closeImageForm();
            document.getElementById("formTextInput").value = this.state.textsArray[index].text;
            document.getElementById("formColorInput").value = this.state.textsArray[index].color;
            document.getElementById("formFontSizeInput").value = parseInt(this.state.textsArray[index].fontSize,10);
            document.getElementById("asd").style.display = "block";
            this.setState({currentIndex: index});
        }
    }

    handleImageClick = (index) =>{
        this.closeForm();
        document.getElementById("addImage").style.display = "none";
        document.getElementById("deleteImage").style.display = "block";
        document.getElementById("imageForm").style.display = "block";
        document.getElementById("formUrlInput").value = this.state.imagesArray[index].imageURL;
        document.getElementById("formHeightInput").value = this.state.imagesArray[index].imageHeight;
        document.getElementById("formWidthInput").value = this.state.imagesArray[index].imageWidth;
        this.setState({currentIndex: index});
    }

    deleteImage = () =>{
        console.log("About to delete image #" + this.state.currentIndex);
        var updated = this.state.imagesArray;
        updated.splice(this.state.currentIndex,1);
        this.closeImageForm();
        this.setState({imagesArray: updated, currentIndex: 0});
    }


    isNotEmpty = () =>{
        let texts = this.state.textsArray;
        if(texts.length > 0 && texts[this.state.currentIndex].text.trim().length === 0){
            this.setState({message: "Text cannot be empty!"});
            return false;
        }
        this.setState({message: ''});
        return true;
    }

    closeForm = () =>{
        if(this.isNotEmpty()){
            document.getElementById("asd").style.display = "none";
        }
    }

    closeImageForm = () =>{
        document.getElementById("imageForm").style.display = "none";
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
        if((v <= 150) && (v >= 4)){
            console.log("Changing the font size of text #" + this.state.currentIndex + " to: " +  v);
            let texts = this.state.textsArray;
            texts[this.state.currentIndex].fontSize = v;
            this.setState({textsArray: texts});
            document.getElementById("formFontSizeInput").value = v
        }
    }

    deleteText = () =>{
        console.log("About to delete text #" + this.state.currentIndex);
        var updated = this.state.textsArray;
        updated.splice(this.state.currentIndex,1);
        this.setState({textsArray: updated, currentIndex: 0});
        document.getElementById("asd").style.display = "none";
    }

    render() {
        let name, width, height, backgroundColor, borderWidth, borderColor, borderRadius, margin, padding;

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
                display: "flex",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px"
            }
        }
        return (
            <Query query={GET_LOGO} key = {this.props.match.params.logoId} variables={{ id: this.props.match.params.id, logoId: this.props.match.params.logoId }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if(this.state.name === null){
                        this.setState({name: data.logo.logos[0].name, width: data.logo.logos[0].width, height: data.logo.logos[0].height, 
                            backgroundColor: data.logo.logos[0].backgroundColor, borderWidth: data.logo.logos[0].borderWidth, borderColor: data.logo.logos[0].borderColor, 
                            borderRadius: data.logo.logos[0].borderRadius, padding: data.logo.logos[0].padding, margin: data.logo.logos[0].margin, textsArray: data.logo.logos[0].texts, 
                            imagesArray: data.logo.logos[0].images});
                    }
                    return (
                        <Mutation mutation={UPDATE_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(updateLogo, { loading, error }) => (
                <div>
                    <div className="container row">
                            <nav onClick = {this.closeForm} id = "myNav">
                                <div style={{ display: "inline-block", float: "left"}}><Link style={{color:"white"}} id="homeButton" to="/">Home</Link></div>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingBottom: "15px", paddingTop: "15px"  }} onClick={this.addText}>Add New Text</button>
                                <button className="createNew" style={{ cursor: "pointer", display: "inline-block", float: "right", marginRight: "3px", paddingBottom: "15px", paddingTop: "15px"  }} onClick = {this.imageForm}>Add New Image</button>
                            </nav>
                    </div>
                    <div className="container">
                    <div style = {{position: "absolute", marginLeft: "68%", zIndex: "1"}}>
                        <div id="asd" style = {{display: "none", backgroundColor: "white", borderRadius: "15px", borderStyle: "solid", borderWidth: "2px"}}>
                                <div className="row" style={{paddingTop: "20px"}}>
                                <button onClick = {this.closeForm} style ={{position: "absolute", right: "5px", top: "5px", borderRadius: "7px", backgroundColor: "red"}}>x</button>
                                <div style ={{color: "red"}}>{this.state.message}</div>
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
                                            <input id= "formColorInput" type="color" style = {{width: "50%"}} name="logoName" className="form-control" ref={node => {
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
                                            <input id= "formFontSizeInput" min = '4' max = '100' type="number" style = {{color: "black", width: "50%"}} name="logoName" className="form-control" ref={node => {
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
                    <div style = {{position: "absolute", marginLeft: "68%", zIndex: "1"}}>
                        <div id="imageForm" style = {{display: "none", backgroundColor: "white", borderRadius: "15px", borderStyle: "solid", borderWidth: "2px"}} onSubmit = {e => this.addImage}>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <button onClick = {this.closeImageForm} style ={{position: "absolute", right: "5px", top: "5px", borderRadius: "7px", backgroundColor: "red"}}>x</button>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Url:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formUrlInput" type="text" style = {{color: "black"}} placeholder=""  onChange = "" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Image Height:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formHeightInput" min = '4' max = '100' type="number" style = {{color: "black", width: "50%"}} name="logoName" className="form-control" ref={node => {
                                                name = node;}} placeholder="" onChange = ""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{paddingTop: "20px"}}>
                                    <div className="form-group">
                                        <div className="col s4" style = {{marginTop: "10px", color: "black"}}>
                                            Image Width:
                                        </div>
                                        <div className="col s8">
                                            <input id= "formWidthInput" min = '4' max = '100' type="number" style = {{color: "black", width: "50%"}} name="logoName" className="form-control" ref={node => {
                                                name = node;}} placeholder="" onChange = ""/>
                                        </div>
                                    </div>
                                </div>
                                <div id = "addImage" style={{paddingBottom: "5px", display: "none"}}>
                                    <div className="form-group" style={{margin: "auto", textAlign: "center"}}>
                                        <button  onClick = {this.addImage} style = {{borderRadius: "8px", backgroundColor: "limegreen", color: "black"}}>
                                            Add Image
                                        </button>
                                    </div>
                                </div>
                                <div id = "deleteImage" style={{paddingBottom: "5px", display: "none"}}>
                                    <div className="form-group" style={{margin: "auto", textAlign: "center"}}>
                                        <button onClick = {this.editImage} style = {{borderRadius: "8px", backgroundColor: "limegreen", color: "black"}}>
                                            Submit Edit
                                        </button>
                                        <button onClick = {this.deleteImage} style = {{borderRadius: "8px", backgroundColor: "red", color: "black"}}>
                                            Delete this Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                        <div className="panel panel-default">
                            <div className="row">
                            <div onClick = {this.closeForm, this.closeImageForm} className="panel-body" style={{WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)", width:"33.3333%", display: "inline-table", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "white", paddingLeft: "0.75rem", paddingRight: "0.75rem"}}>
                                <form name="myForm" onSubmit={e => {
                                    e.preventDefault();
                                    if(this.checkNull()){
                                    var arr = this.state.textsArray;
                                    for(let i = 0; i < arr.length; i++){
                                        var newFont = parseInt(arr[i].fontSize,10);
                                        arr[i].fontSize = newFont;
                                        delete arr[i]._id;
                                        delete arr[i].__typename;
                                    }
                                    var arr2 = this.state.imagesArray;
                                    for(let i = 0; i < arr2.length; i++){
                                        var newHeight = parseInt(arr2[i].imageHeight,10);
                                        arr2[i].imageHeight = newHeight;
                                        var newWidth = parseInt(arr2[i].imageWidth,10);
                                        arr2[i].imageWidth = newWidth;
                                        delete arr2[i]._id;
                                        delete arr2[i].__typename;
                                    }
                                    updateLogo({ variables: {id: this.props.match.params.id, logoId: this.props.match.params.logoId, name: name.value, height: parseInt(height.value), width: parseInt(width.value), backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), margin: parseInt(margin.value), padding: parseInt(padding.value), texts: arr, images: arr2} });
                                    name.value = "";
                                    height.value = "";
                                    width.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";    
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    margin.value = "";
                                    padding.value = "";
                                }}}>
                                    <div className="panel-title" style={{textAlign: "center", backgroundColor: "#546e7a", color: "white", marginTop: "0.5rem", marginBottom: "1rem", borderRadius: "5px"}}>
                                        <div style={{paddingTop: "0.5rem", paddingBottom: "0.5rem", fontSize: "30pt"}}>
                                            Edit Logo
                                        </div>
                                    </div>
                                    <div style={{backgroundColor: "#546e7a", color:"white", paddingLeft: "20px"}}> 
                                        <div className="row" style={{paddingTop: "20px"}}>
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Name:</div>
                                                <div className="col s8">
                                                    <input type="text" style = {{color: "white"}} name="logoName" className="form-control" ref={node => {
                                                        name = node;
                                                    }} placeholder={this.state.name} value = {this.state.name} onChange = {this.handleNameChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Height:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="logoHeight" min="10" max="650" className="form-control" ref={node => {
                                                        height = node;
                                                    }} placeholder={this.state.height} value = {this.state.height} onChange = {this.handleHeightChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4" style = {{marginTop: "10px"}}>Logo Width:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="logoWidth" min="10" max="650" className="form-control" ref={node => {
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
                                                    <input type="number" style = {{color: "white"}} name="borderRadius" min="0" max="200" className="form-control" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder={this.state.borderRadius} onChange={this.handleBorderRadiusChange} value={this.state.borderRadius}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Border Width:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="borderWidth" min="0" max="200" className="form-control" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder={this.state.borderWidth} onChange={this.handleBorderWidthChange} value={this.state.borderWidth} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Margin:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="margin" min="0" max="200" className="form-control" ref={node => {
                                                        margin = node;
                                                    }} placeholder={this.state.margin} onChange={this.handleMarginChange} value={this.state.margin} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <div className="col s4">Padding:</div>
                                                <div className="col s8">
                                                    <input type="number" style = {{color: "white"}} name="padding" min="0" max="200" className="form-control" ref={node => {
                                                        padding = node;
                                                    }} placeholder={this.state.padding} onChange={this.handlePaddingChange} value={this.state.padding} />
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
                                                <div onClick = {() => this.handleClick(index)} style = {{color: this.state.textsArray[index].color, fontSize: this.state.textsArray[index].fontSize + "px" }}>
                                                    {single_text.text}
                                                </div>
                                            </div>
                                        ))}
                                        {this.state.imagesArray.map((single_image, index) => (
                                            <div className="profile-pic">
                                                <img onClick = {() => this.handleImageClick(index)} src = {single_image.imageURL} alt = "error" height = {single_image.imageHeight} width = {single_image.imageWidth}>
                                                </img>
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;