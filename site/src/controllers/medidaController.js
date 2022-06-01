var medidaModel = require("../models/medidaModel");

function pegarEstufasController(req, res) {

    const limite_linhas = 7;

    var idCliente = req.body.idCliente;
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.pegarEstufasModel(idCliente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function pegarSensoresController (req,res){
    var idEstufa = req.body.idEstufa;

    medidaModel.pegarSensoresModel(idEstufa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function pegarMedidaController (req,res){
    var idSensor = req.body.idSensor;

    medidaModel.pegarMedidaModel(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function pegarHistoricoController (req, res){
    const ultimasMed = 6;
    console.log(`Pegando as ultimas ${ultimasMed}`);
    var idSensor = req.body.idSensor;
    
    medidaModel.pegarHistoricoModel(idSensor,ultimasMed).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarEstufasController,
    pegarSensoresController,
    pegarMedidaController,
    pegarHistoricoController,
    buscarMedidasEmTempoReal
}