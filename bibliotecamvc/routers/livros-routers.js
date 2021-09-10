const express = require("express");
const router = express.Router();

const livrosController = require("../controllers/livros-controller");

router.get("/",livrosController.pagina_principal);

router.get("/listandoLivros", livrosController.listar_livros);

router.get("/deletandoLivros/:id", livrosController.deletar_livros);

router.get("/cadastrandoLivros", livrosController.cadastrar_livros_get);

router.post("/cadastrandoLivros", livrosController.cadastrar_livros_post);

module.exports = router