const livros_bd = require("../models/livros-model");

exports.pagina_principal = (req, res) => {
    res.render("views/pages/home");
}

exports.listar_livros = (req,res)=>{
    livros_bd.find({},(err,item)=>{
        if(err)
            return res.status(500).send("Erro ao listar");
        res.render("views/pages/listarLivros",{lista_livros:item})
    })
}

exports.deletar_livros = (req,res)=>{
    var id = req.params.id
    livros_bd.deleteOne({_id:id},(err)=>{
        if(err)
            return res.status(500).send("erro ao deletar");
        res.redirect("/listandoLivros")
    })
}

exports.cadastrar_livros_get = (req, res) =>{
    res.render("views/pages/cadastrarLivros")
}

exports.cadastrar_livros_post = (req,res)=>{
    let cadastrar_livro = new livros_bd()

    cadastrar_livro.Titulo = req.body.titulo
    cadastrar_livro.Autor = req.body.autor
    cadastrar_livro.Genero = req.body.genero
    cadastrar_livro.Status = req.body.status  
    
    cadastrar_livro.save(err =>{
        if(err)
            return res.status(500).send("erro ao salvar livros")
        res.redirect("/listandoLivros")
    })
}

