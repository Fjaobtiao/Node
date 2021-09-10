const aluno_bd = require("../models/alunos-model");


exports.listar_alunos = (req, res)=>{
    aluno_bd.find({}, (err, aluno)=>{
        if(err)
            return res.status(500).send("Erro ao listar");
        res.render("views/pages/alunos",{resultado:aluno});
    });
};

exports.cadastrar_alunos_get = (req, res)=>{
    res.render("views/pages/formAlunos");
};

exports.cadastrar_alunos_post = (req, res)=>{
    let salva_aluno = new aluno_bd();

     salva_aluno.nome = req.body.nome;
     salva_aluno.matricula = req.body.matricula;
     salva_aluno.idade = req.body.idade;
     salva_aluno.classe = req.body.classe;
     salva_aluno.responsavel = req.body.responsavel;
     salva_aluno.tel_contato = req.body.tel_contato;
     
     salva_aluno.save((err)=>{
         if(err)
            return res.status(500).send("Erro ao cadastrar");
        return res.redirect("/alunos");
     });
};

exports.deletar_aluno = (req, res)=>{
    var id = req.params.id;
    aluno_bd.deleteOne({_id:id}, (err)=>{
            if (err)
            return res.status(500).send("Erro ao Deletar");
    res.redirect("/alunos");
});
}

exports.editar_alunos_get = (req, res) => {
    var id = req.params.id;
    aluno_bd.findById(id, (err, aluno)=>{
        if(err)
            return res.status(500).send("Erro ao Editar");
        res.render("views/pages/formEditarAluno",{resultado:aluno});
    });
  };

  exports.editar_alunos_post = (req,res) => {

    var id = req.body.id;
    aluno_bd.findById(id,(err,aluno) => {
        if(err)
            return res.status(500).send("Erro ao editar");
        
            aluno.nome=req.body.nome;
            aluno.vlUnit=req.body.valor;
            aluno.codigoBarras=req.body.codBarras;

            aluno.save((err) => {
            if(err)
                return res.status(500).send("Erro ao cadastrar");
            res.redirect("/alunos");
        });
    });
    }
