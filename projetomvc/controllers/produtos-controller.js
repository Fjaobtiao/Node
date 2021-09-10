const produto_bd = require("../models/produtos-model");


exports.listar_produtos = (req, res)=>{
    produto_bd.find({}, (err, produto)=>{
        if(err)
            return res.status(500).send("Erro ao listar");
        res.render("views/pages/produtos",{resultado:produto});
    });
};

exports.cadastrar_produtos_get = (req, res)=>{
    res.render("views/pages/formProdutos");
};

exports.cadastrar_produtos_post = (req, res)=>{
    let salva_produto = new produto_bd();

     salva_produto.nome = req.body.nome;
     salva_produto.vlUnit = req.body.valor;
     salva_produto.codigoBarras = req.body.codBarras;
     
     salva_produto.save((err)=>{
         if(err)
            return res.status(500).send("Erro ao cadastrar");
        return res.redirect("/produtos");
     });
};

exports.deletar_produto = (req, res)=>{
    var id = req.params.id;
        produto_bd.deleteOne({_id:id}, (err)=>{
            if (err)
            return res.status(500).send("Erro ao Deletar");
    res.redirect("/produtos");
});
}

exports.editar_produtos_get = (req, res) => {
    var id = req.params.id;
    produto_bd.findById(id, (err, produto)=>{
        if(err)
            return res.status(500).send("Erro ao Editar");
        res.render("views/pages/formEditarProduto",{resultado:produto});
    });
  };

  exports.editar_produtos_post = (req,res) => {

    var id = req.body.id;
    produto_bd.findById(id,(err,produto) => {
        if(err)
            return res.status(500).send("Erro ao editar");
        
        produto.nome=req.body.nome;
        produto.vlUnit=req.body.valor;
        produto.codigoBarras=req.body.codBarras;

        produto.save((err) => {
            if(err)
                return res.status(500).send("Erro ao cadastrar");
            res.redirect("/produtos");
        });
    });
    }
