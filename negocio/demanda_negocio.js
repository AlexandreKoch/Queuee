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

function listar (idOrder, callback){
    let statement
    if (idOrder == 1){
        console.log('Msg_2.5 SAVING')
        statement = "SELECT D.id, D.solicitante, D.processo, D.area, D.departamento, D.usuario_chave, D.dono_do_processo, D.patrocinador, S.descricao AS status, I.descricao AS dado_entrada, D.saving, GUT.gravidade * GUT.urgencia * GUT.tendencia AS criticidade FROM demanda as D LEFT JOIN status s ON D.cd_status = S.id LEFT JOIN tipo_input I ON D.cd_input = I.id LEFT JOIN gut GUT ON GUT.cd_demanda = D.id ORDER BY saving DESC"
    }
    else if (idOrder == 2){
        console.log('Msg_2.5 CRITICIDADE')
        statement = "SELECT D.id, D.solicitante, D.processo, D.area, D.departamento, D.usuario_chave, D.dono_do_processo, D.patrocinador, S.descricao AS status, I.descricao AS dado_entrada, D.saving, GUT.gravidade * GUT.urgencia * GUT.tendencia AS criticidade FROM demanda as D LEFT JOIN status s ON D.cd_status = S.id LEFT JOIN tipo_input I ON D.cd_input = I.id LEFT JOIN gut GUT ON GUT.cd_demanda = D.id ORDER BY criticidade DESC"
    }
    else{
        console.log('Msg_2.5 NEM UM NEM OUTRO')
        const erro = {
            mensagem: "Não foi identificado o critério de priorização",
            numero: 400
        }
    }
    console.log('Msg_3')
    demandaRepositorio.listar(statement, callback);
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