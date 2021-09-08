var express = require("express");
var mongoose = require("mongoose")

const app = express();
const port = 3000;

mongoose.connect("mongodb+srv://jota_nascimento:jota_nascimento@cluster0.nzbq2.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology:true})

const Livros = mongoose.model("livros",{
    nome: String,
    categoria: String,
    codigo: String,
    autor: String,
});

app.set("view engine", "ejs");
app.set("views", __dirname,"/views");

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (rep,res)=>{
    res.send("Página Inicial");
});

// rota para renderizar a pagina de formulario do cadastro
app.get("/cadastrarLivros", (req, res) => {
    res.render("formlivros")
  })


  //metodo POST para salvar os produtos no DB 
app.post("/cadastrarLivros", (req, res) => {
    let livro = new Livros() //criando um objeto do tipo produtos
  
    livro.nome = req.body.nome //recebe os dados atraves da tag name
    livro.categoria = req.body.categoria //recebe os dados atraves da tag name
    livro.codigo = req.body.codigo //recebe os dados atraves da tag name
    livro.autor = req.body.autor //recebe os dados atraves da tag name
  
    livro.save(err => { //condicao para verificar erro
      if (err) //condicao
        return res.status(500).send("Erro ao cadastrar") // case true status 500
  
      return res.redirect("/livros") // case false redireciona para a pagina produtos
    })
  })


//criando uma rota para listar os produtos cadastrados
app.get("/livros", (req, res) => { //rota para pag produtos
    Livros.find({}, (err, livro) => { //find{pega tudo}
      if (err)
        return res.status(500).send("Erro ao consultar Produto")
  
      res.render("livros", {
        item: livro
      }) //renderizar pag produtos
    })
  })


  app.get("/formEditlivro/:id",(req,res)=>{
    Livros.findById(req.params.id,(err,livros)=>{
        if(err)
          return res.status(500).send("erro ao consultar livro")
        res.render("formEditlivro",{livros:livros});  
    });

});

//editar e salvar
app.post("/formEditlivro", (req, res) => {
    var id = req.body.id
    Livros.findById(id, (err, livros) => {
      if (err)
        return res.status(500).send("Erro ao consultar Livro")
        livros.nome = req.body.nome
        livros.codigo = req.body.codigo
        livros.categoria = req.body.categoria
        livros.autor = req.body.autor
  
      livros.save(err => {
        if (err)
          return res.status(500).send("Erro ao editar livro")
        return res.redirect("/livros")
      })
    })
  })

//DELETAR
app.get("/deletarLivro/:id", (req, res) => {
    var chave = req.params.id
  
    Livros.deleteOne({
      _id: chave
    }, (err, result) => {
      if (err)
        return res.status(500), send("Erro ao excluir livro")
    })
    res.redirect("/livros")
  })


  // criar uma rota para busca que funcione, mudar para string
  app.get("/pesquisar", (req,res)=>{
    var busca = req.query.pesquisa;   // query vem de consulta

    Livros.find({$or:[{nome:busca},{categoria:busca},{codigo:busca},{autor:busca}]}, (err, livro) => { //informa de onde vem a busca}
      if (err)
        return res.status(500).send("Erro ao consultar Produto")
  
      res.render("livros", {item: livro}) //renderizar pag produtos
    })
  })

app.listen(port, ()=>{
    console.log("Servidor rodando na porta "+port)
})