var express = require("express");
const app = express();
var mongoose = require("mongoose");

const port = 3000

app.set("view engine", "ejs");
app.set("views", __dirname,"/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/vendas?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})

// Rotas
const produtos_router = require("./routers/produtos-router");



app.use("/produtos", produtos_router);

app.get("/", (req,res)=>{
    res.send("página principal");
});







app.listen(port, ()=>{
    console.log("Servidor rodando na porta "+port)
})