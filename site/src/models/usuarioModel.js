var database = require("../database/config")


function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT * FROM cliente WHERE emailCliente = '${email}' AND senha = CONVERT(VARCHAR(32), HashBytes('MD5', '${senha}'), 2);`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT * FROM cliente WHERE emailCliente = '${email}' AND senha = MD5('${senha}');`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, telefone, email, senha) {
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `INSERT INTO cliente (nome, cnpj, telefone, email, senha) VALUES ('${nome}', '${cnpj}', '${telefone}', '${email}', CONVERT(VARCHAR(32), HashBytes('MD5', '${senha}'), 2));`;
    }
    else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `INSERT INTO cliente (nomeCliente, cnpj, telefoneCliente, emailCliente, senha) VALUES ('${nome}', '${cnpj}', '${telefone}', '${email}', MD5('${senha}'));`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
};