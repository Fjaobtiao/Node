const produto_bd = require("../models/produtos-model"); // importando o modelo do banco

// definindo a funcionalidade da rota listar_produtos
exports.listar_produtos = (req, res) => {
    produto_bd.find({}, (err, produto) =>{
        if (err)
            return res.status(500).send("Erro ao consultar Produto");
        res.render("views/pages/produtos", { produtos_itens: produto });
    });
};

