var mongoose            = require("mongoose");
//////////////
const Pet               = require('../models/Pet.js');
const Comment             = require('../models/Comment.js');

//////////
mongoose.connect('mongodb://localhost:27017/purrMatch',{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connected")
})
.catch(err => {
    console.log(err)
});
var animals = [
    {name: "cat1",
    image: "https://i.imgur.com/AD3MbBi.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus justo, molestie vitae mauris vel, pretium pulvinar neque. Nulla eleifend maximus turpis, eu aliquam nisi vehicula vitae. Donec bibendum augue ",
    location: "Tangier,Adress1"},
    {name: "cat2", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus justo, molestie vitae Vestibulum vulputate arcu porta efficitur elementum. Duis condimentum cursus sem id laoreet. Phasellus non fermentum ex,",
    location: "Tangier,Adress1"},
    {name: "cat3",
    image: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus justo, molestie vitae. Vestibus condimentuem id laoreet. Phasellus non fermentum ex, ",
    location: "Tangier,Adress1"},
    {name: "cat4", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus justo, molestie vitaeel aliquam vulputate. Vestibulum vulputate arcu porta efficitm id laoreet. Phasellus non fermentum ex, ",
    location: "Tangier,Adress1"},
    {name: "cat5",
    image: "https://i.imgur.com/AD3MbBi.jpeg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisqundum augue vel aliquam vulputate. Vestibulum vulputate arcu porta efficitur elementum. Duis condimentum cursus sem id lon fermentum ex, ",
    location: "Tangier,Adress1"},
    {name: "cat6",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus justo, molestie vitae muam vulputate. Vestibulum vulputate arcu porta efficitur elementum.cursus sem id laoreet. Phasellus non fermentum ex, ",
    location: "Tangier,Adress1"},
]


const seedDb = async() => {
   
    await Pet.deleteMany({});
    await Comment.deleteMany({});

    // for(let i=0; i<6 ;i++){
    //     const p = new Pet({
    //         author: '60ab034b3d5b0a09f89e6ccb',
    //         name: animals[i].name,
    //         image: animals[i].image,
    //         description: animals[i].description,
    //         location: animals[i].location
    //     })
        // await Pet.save();
        // await Comment.save();

    }

seedDb();