var express = require("express");
var mongoose = require("mongoose")

const app = express();
const port = 8000;

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/escola?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})

const Alunos = mongoose.model("alunos",{
    nome: String,
    matricula: Number,
    idade: Number,
    classe: String,
    responsavel: String,
    tel_contato: String
});

app.set("view engine", "ejs");
app.set("views", __dirname,"/views");

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static("public")); // cria apasta public e dentro dela coloca os arquivos css e js

app.get("/", (rep,res)=>{
    res.send("Página Inicial");
});

app.get("/alunos", (rep,res)=>{
    let listar_alunos = Alunos.find({}, (err, listAlunos)=>{
        if(err)
        return res.status(500).send("Erro ao cadastrar o Aluno");
        res.render("alunos", {listando_alunos:listAlunos});
    });
});

app.get("/cadastrarAlunos",(rep,res)=>{
    res.render("formalunos")
});

app.post("/cadastrarAlunos", (req,res)=>{
    let listando_alunos = new Alunos ();

    listando_alunos.nome = req.body.nome;
    listando_alunos.matricula = req.body.matricula;
    listando_alunos.idade = req.body.idade;
    listando_alunos.classe = req.body.classe;
    listando_alunos.responsavel = req.body.responsavel;
    listando_alunos.tel_contato = req.body.tel_contato;

    listando_alunos.save((err) =>{
        if(err)
              return res.status(500).send("Erro ao Cadastrar Aluno");
        return res.redirect("/alunos")
    });
}); 


app.get("/deletarAluno/: id", (req,res)=>{
    var chave = req.params.id;

    Alunos.deleteOne({_id:chave}, (err,result) =>{
        if(err)
            return res.status(500).send("Erro ao excluir registro");
        res.redirect("/alunos");
    });
});

app.listen(port, ()=>{
    console.log("Servidor rodando na porta "+port)
})






