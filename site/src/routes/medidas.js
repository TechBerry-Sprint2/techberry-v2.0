var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/pegarEstufas", function (req, res) {
    console.log('Chegou na rota!')
    medidaController.pegarEstufasController(req, res);
});
router.post("/pegarSensores", function (req, res) {
    console.log('Chegou na rota Sensores!')
    medidaController.pegarSensoresController(req, res);
});
router.post("/pegarMedida", function (req, res) {
    console.log('Chegou na rota Medidas!')
    medidaController.pegarMedidaController(req, res);
});
router.post("/pegarHistorico", function (req, res) {
    console.log('Chegou na rota historico!')
    medidaController.pegarHistoricoController(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;