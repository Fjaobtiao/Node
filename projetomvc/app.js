var express = require("express");
const app = express();
var mongoose = require("mongoose");

const port = 8000;

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.uymml.mongodb.net/vendas?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true});

app.set("view engine", "ejs");
app.set("views", __dirname,"/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const produtos_router = require("./routers/produtos-router")

app.use("/produtos", produtos_router);

app.get("/", (req,res)=>{
    res.send("Página inicial");
});

app.listen(port,()=>{
    console.log("servidor rodando na porta ", port);
});
