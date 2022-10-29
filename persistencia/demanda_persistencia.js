const {Client} = require('pg');

const erroBD = { 
    mensagem: "Erro de conexao no BD",
    numero: 500
};
const erroDemandaNaoEncontrada = {
    mensagem: "Demanda nao encontrada",
    numero:404
};

const conexao = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'queuee'
};

//INSERIR DEMANDA
function inserir(demanda, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const values = [demanda.solicitante, demanda.processo, demanda.area, demanda.departamento, demanda.usuario_chave, demanda.dono_do_processo, demanda.patrocinador, demanda.cd_status, demanda.cd_input, demanda.saving];

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


//LISTAR DEMANDA
function listar(callback){
    const cliente = new Client(conexao)
    cliente.connect()

    const sql = "SELECT D.id, D.solicitante, D.processo, D.area, D.departamento, D.usuario_chave, D.dono_do_processo, D.patrocinador, S.descricao AS status, I.descricao AS dado_entrada, D.saving FROM demanda as D LEFT JOIN status s ON D.cd_status = S.id LEFT JOIN tipo_input I ON D.cd_input = I.id";


    cliente.query(sql,
        function (err, res){
            if(err){
                callback(err.message, undefined);
            }
            else{
                let demandas = res.rows;
                callback(undefined, demandas)
            }
            cliente.end();
        })
}


//ATUALIZAR DEMANDA
function atualizar (id, demanda, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE demandas SET descricao = $2 WHERE id = $1 RETURNING *"
    const values = [id, demanda.descricao]

    cliente.query(sql, values,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else if(res.rows && res.rows.length > 0){
                let demanda = res.rows[0]
                callback(undefined, demanda)
            }
            else{
                callback(erroDemandaNaoEncontrada, undefined)
            }
            cliente.end()
        })
}


//BUSCAR DEMANDA
function buscarPorId(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM demandas WHERE id = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);
            }
            else if (res.rows && res.rows.length > 0) {
                let demanda = res.rows[0];
                callback(undefined, demanda);
            }
            else {
                callback(erroDemandaNaoEncontrada, undefined);
            }
            cliente.end();
        }
    )    
}

//DELETAR DEMANDA
function deletar(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "DELETE FROM demandas WHERE id = $1 RETURNING *";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let demanda = res.rows[0];
                callback(undefined, demanda);
            }
            else {
                callback(erroDemandaNaoEncontrada, undefined);
            }    
            cliente.end(); 
        }
    )    
}

//EXPORT
module.exports = {
    inserir, listar, atualizar, buscarPorId, deletar
}