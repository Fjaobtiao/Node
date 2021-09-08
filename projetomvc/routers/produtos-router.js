var express = require("express");
const router = express.Router();

const produtosController = require("../controllers/produtos-controller");


router.get ("/", produtosController.listar_produtos);








module.exports = router // deve vir sempre no final da página