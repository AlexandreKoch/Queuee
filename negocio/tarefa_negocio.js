const tarefaRepositorio = require ('../persistencia/tarefa_persistencia.js');

function inserir (tarefa, callback){
    if(!tarefa || !tarefa.descricao){
        const erro = {
            mensagem: "A tarefa possui campos obrigatórios não preenchidos.",
            numero: 400
        }
        callback(erro, undefined)
    }
    else{
        tarefaRepositorio.inserir(tarefa, callback);
    }
}

function listar (id, callback){
    // if(!cd_demanda || isNaN(cd_demanda)){
    if(!id || isNaN(id)){
        const erro = {
            mensagem: "Identificaro inválido",
            numero: 400
        }
        callback(erro, undefined);
    }
    else{
        tarefaRepositorio.listar(id, callback);
}
}

function atualizar (id, tarefa, callback){
    if(!id || isNaN(id)){
        const erro = {
            mensagem: "Identificador inválido",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if (!tarefa || !tarefa.descricao){
        const erro = {
            mensagem: "Todos os campos devem ser preenchidos",
            numero: 400
        };
        callback(erro, undefined)
    }
    else{
        tarefaRepositorio.atualizar(id, tarefa, callback);
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
        tarefaRepositorio.buscarPorId(id, callback);
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
        tarefaRepositorio.deletar(id, callback);
    }
}

module.exports = {
    inserir, listar, atualizar, buscarPorId, deletar
}