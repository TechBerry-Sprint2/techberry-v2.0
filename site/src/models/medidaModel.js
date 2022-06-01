var database = require("../database/config");


function pegarEstufasModel(idCliente) {
    instrucaoSql = `select * from
                    estufa where 
                     estufa.idCliente = ${idCliente}`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegarSensoresModel(idEstufa) {
    instrucaoSql = `select * from
                    sensor where 
                     sensor.idEstufa = ${idEstufa}`
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegarMedidaModel(idSensor) {
    instrucaoSql ='';
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP 1  * from
                        medida where 
                        medida.idSensor = ${idSensor}
                        order by idMedida desc`
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        
        instrucaoSql = `select * from
                        medida where 
                        medida.idSensor = ${idSensor}
                        order by idMedida desc`
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    }else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    return database.executar(instrucaoSql);
}
function pegarHistoricoModel (idSensor, ultimasMed){

    instrucaoSql = '';
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select TOP ${ultimasMed} idMedida, temperaturaRegistrada, umidadeRegistrada, convert(varchar, horarioRegistro, 3) AS 'dia',
        convert(varchar, horarioRegistro, 24) AS 'horario', idSensor from
        medida where 
        medida.idSensor = ${idSensor}
        order by idMedida desc;`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        
        instrucaoSql = `select idMedida, temperaturaRegistrada, umidadeRegistrada, DATE_FORMAT(horarioRegistro, '%d/%m') AS 'dia',
                        DATE_FORMAT(horarioRegistro, '%H:%i') AS 'horario', idSensor from
                        medida where 
                        medida.idSensor = ${idSensor}
                        order by idMedida desc limit ${ultimasMed}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `select 
                        temperatura, 
                        umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    pegarEstufasModel,
    pegarSensoresModel,
    pegarMedidaModel,
    pegarHistoricoModel,
    buscarMedidasEmTempoReal
}