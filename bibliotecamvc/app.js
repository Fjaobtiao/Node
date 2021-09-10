var express = require("express");
const app = express();
var mongoose = require("mongoose");

const port = 8000;

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})

app.set("view engine", "ejs");
app.set("views", __dirname,"/views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

const livrosRouter = require("./routers/livros-routers")

app.use("/", livrosRouter);

app.listen(port,()=>{
    console.log("servidor rodando na porta ", port);
});
