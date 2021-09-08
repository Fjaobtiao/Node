var mongoose = require("mongoose");

const Produtos = mongoose.model("produtos",{
    nome: String,
    vlUnit: String,
    codigoBarras: String
})

module.exports = Produtos;