var express = require("express");
const router = express.Router();

const produtoController = require("../controllers/produtos-controller");

router.get("/", produtoController.listar_produtos);

router.get("/cadastrarProdutos", produtoController.cadastrar_produtos_get);

router.post("/cadastrarProdutos", produtoController.cadastrar_produtos_post);







module.exports = router;