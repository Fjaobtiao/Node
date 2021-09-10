var mongoose = require("mongoose");

const Alunos = mongoose.model("alunos",{
    nome:String,
    matricula: String,
    idade: String,
    classe: String,
    responsavel: String,
    tel_contato: String,
});

module.exports = Alunos;


