const Alunos = require("../models/alunos-model");


exports.login_get = (req, res) => {
    res.render("./views/pages/login");
}


exports.login_post = (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    Alunos.findOne({
        $and: [{
            email: email
        }, {
            senha: senha
        }]
    }, (err, usuario) => {
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");

        if (usuario) {
            // return res.redirect("/alunos/" + usuario._id);
            return res.send("erro")

        }
    })
}
