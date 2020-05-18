import '../App.css';

class TextObject{
    constructor(text, color, fontSize){
        if(text === undefined){
            this.text = "Click me to edit";
        }
        else{
            this.text = text;
        }
        if(color === undefined){
            this.color = "black";
        }
        else{
            this.color = color;
        }
        if(fontSize === undefined){
            this.fontSize = "12px";
        }
        else{
            this.fontSize = fontSize + "px";
        }
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
        this.fontSize = fontSize + "px";
    }
}


export default TextObject;