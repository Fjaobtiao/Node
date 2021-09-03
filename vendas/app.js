var express = require("express"); // chamando o modulo express
var mongoose = require("mongoose"); // chamando o modulo mongoose que é para realizamor a modelagem no banco de dados

const app = express(); // criando uma aplicação
const port = 3000; // Definindo a porta

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/vendas?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true}) // fazendo a coneção com o banco de dados, com uso de flags para tratarmos os depreciados


// criando um modelo que urá compor(modelar) a collection do banco
const Produtos = mongoose.model("produtos", {
    nome: String, 
    vlUnit: Number,
    codigoBarras: String
});


// chamando o motor de visualização ejs
app.set("view engine", "ejs");
app.set("views", __dirname,"/views");

// permitindo que meus dados transitem entre as páginas
app.use(express.urlencoded());
app.use(express.json()); // paginas em formato de json

// criando uma rota principal
app.get("/", (rep,res)=>{
    res.send("Página Inicial");
});


// criando uma rota para listas os produtos cadastrados
app.get("/produtos", (req,res)=>{
    let consulta = Produtos.find({}, (err, produto)=>{ // o produtos aqui é do banco e esta como constante na linha 11
        if(err)
            return res.status(500).send("Erro ao cadastrar Produto");
     res.render("produtos", {produto_itens:produto}); // o produtos dentro da chaves puxa os produtos que estão na pagina produtos.ejs, o segundo equivale a cada item da consulta
    });    
});

// rota para renderizar a página de formulário de cadastro.
app.get("/cadastrarProdutos",(rep,res)=>{
    res.render("formprodutos")
});


// metodo POST para salvar os produtos no banco
app.post("/cadastrarProdutos", (req,res)=>{
    let produto = new Produtos(); // sempre que tiver um new, estou criando uma instancia. Criando um objeto do tipo Produtos, que esta rerlacionado com a collections Produtos

    produto.nome = req.body.nome; // esta referenciado ao model e ao formulário. O req em rosa aqui é o mesmo do req em rosa do app.post
    produto.vlUnit = req.body.valor;
    produto.codigoBarras = req.body.codBarras;

    produto.save((err) =>{ // aqui salva no banco de dados
        if(err)
            return res.status(500).send("Erro ao cadastrar Produto");
        return res.redirect("/produtos");

    })

 
})

app.get("/deletarProduto/:id", (req,res)=>{
    var chave = req.params.id;

    Produtos.deleteOne({_id:chave}, (err,result) =>{
        if(err)
            return res.status(500).send("Erro ao excluir produto");
        res.redirect("/produtos");
    });
});


// definindo a porta que irei acessar a minha aplicação.
app.listen(port, ()=>{
    console.log("servidor rodando na porta "+port);
});




