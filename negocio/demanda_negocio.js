const demandaRepositorio = require ('../persistencia/demanda_persistencia.js');

function inserir (demanda, callback){
    if(!demanda || !demanda.processo || !demanda.gravidade || !demanda.urgencia || !demanda.tendencia || !demanda.cd_ativo){
        const erro = {
            mensagem: "A demanda possui campos obrigatórios não preenchidos.",
            numero: 400
        }
        callback(erro, undefined)
    }
    else{
        demandaRepositorio.inserir(demanda, callback);
    }
}

function listar (callback){
    demandaRepositorio.listar(callback);
}

function atualizar (id, demanda, callback){
    if(!id || isNaN(id)){
        const erro = {
            mensagem: "Identificador inválido",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if (!demanda || !demanda.solicitante){
        const erro = {
            mensagem: "Todos os campos devem ser preenchidos",
            numero: 400
        };
        callback(erro, undefined)
    }
    else{
        demandaRepositorio.atualizar(id, demanda, callback);
    }
}

function buscarPorId (id, callback){
    if(!id || isNaN(id)){
        const erro = {
            mensagem: "Identificaro inválido",
            numero: 400
        }
        callback(erro, undefined);
    }
    else{
        demandaRepositorio.buscarPorId(id, callback);
    }
}

function deletar(id, callback){
    if(!id || isNaN(id)){
        const erro = {
            mensagem: "Identificador inválido",
            numero: 400
        }
        callback(erro, undefined);
    }
    else{
        demandaRepositorio.deletar(id, callback);
    }
}

module.exports = {
    inserir, listar, atualizar, buscarPorId, deletar
}