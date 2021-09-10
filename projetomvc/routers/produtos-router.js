var express = require("express");
const router = express.Router();

const produtoController = require("../controllers/produtos-controller");

router.get("/", produtoController.listar_produtos);

router.get("/cadastrarProdutos", produtoController.cadastrar_produtos_get);

router.post("/cadastrarProdutos", produtoController.cadastrar_produtos_post);

router.get("/deletarProdutos/:id", produtoController.deletar_produto);

router.get("/editarProdutos/:id", produtoController.editar_produtos_get);

router.post("/editarProdutos", produtoController.editar_produtos_post);



module.exports = router;