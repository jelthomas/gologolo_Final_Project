import '../App.css';

class ImageObject{
    constructor(imageURL, imageHeight, imageWidth){
        this.imageURL = imageURL;
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
    }

    getURL(){
        return this.imageURL;
    }

    setURL(imageURL){
        this.imageURL = imageURL;
    }

    getHeight(){
        return this.imageHeight;
    }

    setHeight(imageHeight){
        this.imageHeight = imageHeight;
    }

    getWidth(){
        return this.imageWidth;
    }

    setWidth(imageWidth){
        this.imageWidth = imageWidth;
    }
}


export default ImageObject;