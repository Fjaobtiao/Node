var express = require("express");
const router = express.Router();

const alunoController = require("../controllers/alunos-controller");

router.get("/", alunoController.listar_alunos);

router.get("/cadastrarAlunos", alunoController.cadastrar_alunos_get);

router.post("/cadastrarAlunos", alunoController.cadastrar_alunos_post);

router.get("/deletarAlunos/:id", alunoController.deletar_aluno);

router.get("/editarAlunos/:id", alunoController.editar_alunos_get);

// router.post("/editarAlunos", alunoController.editar_alunos_post);

router.get("/login", alunoController.login_get);

router.post("/login", alunoController.login_post)


module.exports = router;