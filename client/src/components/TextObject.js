import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class TextObject{
    constructor() {
        this.text = "Hover to edit";
        this.color = "black";
        this.fontSize = 12;
    }

    getText(){
        return this.text;
    }

    setText(text){
        this.text = text;
    }

    getColor(){
        return this.color;
    }

    setColor(color){
        this.color = color;
    }

    getFontSize(){
        return this.fontSize;
    }

    setFontSize(fontSize){
        this.fontSize = fontSize;
    }
}


export default TextObject;