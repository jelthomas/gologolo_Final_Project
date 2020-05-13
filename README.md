Query all logos with all attributes:

{
   logos {
     _id
     text
     color
     backgroundColor
     borderColor
     fontSize
     borderRadius
     borderWidth
     padding
     margin
     lastUpdate
   }
}

Query a specific logo and its attributes:

{
  logo (id: "5e936234b751115ca0a44d37"){
    _id
    text
    color
    backgroundColor
    borderColor
    fontSize
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}

Remove a specific logo:

mutation {
  removeLogo(id: "5e936234b751115ca0a44d37") {
    _id
  }
}

Add a logo:

mutation {
  addLogo(text: "ADDED!", color: "#FFF000", backgroundColor: "#FFF000", borderColor: "#FFF000", fontSize: 11, borderRadius: 11, borderWidth: 11, padding: 11, margin: 11) {
    _id
    text
    color
    backgroundColor
    borderColor
    fontSize
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}

Update a logo:

mutation {
  updateLogo(id: "5e935c48b751115ca0a44d36", text: "UPDATED", color: "#FFF000", backgroundColor: "#FFF000", borderColor: "#FFF000", fontSize: 11, borderRadius: 11, borderWidth: 11, padding: 11, margin: 11) {
    _id
    text
    color
    backgroundColor
    borderColor
    fontSize
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}
