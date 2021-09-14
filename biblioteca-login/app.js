var express = require("express");
var mongoose = require("mongoose");
const session = require("express-session");
var path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

//Login e senha do usuari o pré-definada
var login = "admin@admin.com.br"
var senha = "123456"

//Conexão com o banco de dados
mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/vendas?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})


//Collection
const Biblioteca = mongoose.model("livros", {
    categoria: String,
    nome: String,
    autor: String,
    ano: Number,
    editora: String

});


//rota pagina principal 
app.get("/", (req, res) => {
    res.render("index")
});


app.set("view engine", "ejs");//use como montor de visualização o ejs
app.set("views", __dirname, "/views");//minhas visualizações que vou precisar utilizar 

//chamando o motor de visualização
app.use(express.urlencoded());//permitindo que os dados passos, que haja fluxo(transitem) enrte minhas paginas 
app.use(express.json());// o fluxo dos meus arquivos seja em formato json
app.use(express.static(__dirname + '/public')); //Minhas pasta com permisão para css e js
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

//Lista da Biblioteca armazenada
app.get("/listaBiblioteca", (req, res) => {
    let consulta = Biblioteca.find({}, (err, Livros) => {
        console.log(consulta)
        if (err)
            return res.status(500).send("Ao consultar Biblioteca");
        res.render("listaBiblioteca", { listaBiblioteca: Livros });
    });

})


app.get("/usuarioLivros", (req, res) => {
    let consulta = Biblioteca.find({}, (err, Livros) => {
        console.log(consulta)
        if (err)
            return res.status(500).send("Ao consultar Biblioteca");
        res.render("usuarioLivros", { listaBiblioteca: Livros });
    });

});

//Pesquisar livros
app.get("/pesquisar", (req,res)=>{
    var busca = req.query.pesquisa;
    console.log(busca);
    Biblioteca.find({$or:[{nome:busca},{autor:busca},{ano:busca},{categoria:busca},{editora:busca}]}, (err, Livros)=>{
        if(err)
            return res.status(500).send("Erro ao pesuisar");
        res.render("usuarioLivros", {listaBiblioteca: Livros });
    })
      
});


//login para adm

app.post("/", (req,res)=>{
    if(req.body.senha ==senha && req.body.login == login){
        req.session.login = login;
        res.redirect("/listaBiblioteca")
    }else{
        res.redirect("/usuarioLivros");
    }
});

app.get("/", (req,res)=>{
    if(req.session.login){
        res.render("usuarioLivros")
    }else{
        res.render("index");
    }
});

//rota Cadastro Biblioteca
app.get("/cadastroBiblioteca", (req, res) => {
    res.render("formBiblioteca")
});


app.post("/cadastroBiblioteca", (req, res) => {
    let livro = new Biblioteca();

    livro.categoria = req.body.categoria;
    livro.nome = req.body.nome;
    livro.autor = req.body.autor;
    livro.ano = req.body.ano;
    livro.editora = req.body.editora;

    livro.save((err) => {
        if (err) // como se trata do servidor, preciso verificar se tem algum erro . 
            return res.status(500).send("Erro ao cadastrar")
        return res.redirect("/listaBiblioteca");
    })
})

app.get("/deletarLivro/:id", (req, res) => {
    let chave = req.params.id; // pegando o id do parametro
    Biblioteca.deleteOne({ _id: chave }, (err, result) => {
        if (err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/listaBiblioteca")
    });

});

app.get("/editarBiblioteca/:id", (req, res) => {
    Biblioteca.findById(req.params.id, (err, conteudo) => {
        if (err)
            return res.status(500).send("Erro ao consultar Biblioteca");
        res.render("formeditarBiblioteca", { conteudo_item: conteudo })
    });

});

app.post("/editarBiblioteca", (req, res) => {
    let id = req.body.id
    Biblioteca.findById(id, (err, livro) => {
        if (err)
            return res.status(500).send("Erro ao consultar Biblioteca");
        livro.categoria = req.body.categoria;
        livro.nome = req.body.nome;
        livro.autor = req.body.autor;
        livro.ano = req.body.ano;
        livro.editora = req.body.editora;


        livro.save(err => {
            if (err)
                return res.status(500).send("Erro ao editar")
            return res.redirect("/listaBiblioteca");
        })
    })
})


app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
});

