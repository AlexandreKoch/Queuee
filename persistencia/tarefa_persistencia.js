const {Client} = require('pg');

const erroBD = { 
    mensagem: "Erro de conexao no BD",
    numero: 500
};
const erroTarefaNaoEncontrada = {
    mensagem: "Tarefa nao encontrada",
    numero:404
};

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'queuee'
};

//INSERIR TAREFA
function inserir(tarefa, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO tarefas () VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [tarefa.descricao, demadna.coluna2, tarefa.coluna3, tarefa.coluna4];

    cliente.query(sql, values,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else{
                callback(undefined, res.rows[0])
            }
            cliente.end()
        })
}


//LISTAR TAREFA
function listar(callback){
    const cliente = new Client(conexao)
    cliente.connect()

    const sql = "SELECT * FROM tarefas";


    cliente.query(sql,
        function (err, res){
            if(err){
                callback(err.message, undefined);
            }
            else{
                let tarefas = res.rows;
                callback(undefined, tarefas)
            }
            cliente.end();
        })
}


//ATUALIZAR TAREFA
function atualizar (id, tarefa, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE tarefas SET descricao = $2 WHERE id = $1 RETURNING *"
    const values = [id, tarefa.descricao]

    cliente.query(sql, values,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else if(res.rows && res.rows.length > 0){
                let tarefa = res.rows[0]
                callback(undefined, tarefa)
            }
            else{
                callback(erroTarefaNaoEncontrada, undefined)
            }
            cliente.end()
        })
}


//BUSCAR TAREFA
function buscarPorId(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM tarefas WHERE id = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);
            }
            else if (res.rows && res.rows.length > 0) {
                let tarefa = res.rows[0];
                callback(undefined, tarefa);
            }
            else {
                callback(erroTarefaNaoEncontrada, undefined);
            }
            cliente.end();
        }
    )    
}

//DELETAR TAREFA
function deletar(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "DELETE FROM tarefas WHERE id = $1 RETURNING *";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let tarefa = res.rows[0];
                callback(undefined, tarefa);
            }
            else {
                callback(erroTarefaNaoEncontrada, undefined);
            }    
            cliente.end(); 
        }
    )    
}

//EXPORT
module.exports = {
    inserir, listar, atualizar, buscarPorId, deletar
}