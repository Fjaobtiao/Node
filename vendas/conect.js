var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/vendas?retryWrites=true&w=majority").then(()=>{
    console.log("banco conectado");
}).catch((err)=>{
    console.log("Deu ruim!"+ err);
});