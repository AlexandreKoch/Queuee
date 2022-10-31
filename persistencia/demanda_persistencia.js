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
    cliente.connect()
    
    //SQL e Values p/ as 3 tabelas em um único statement 
    //const sql = "INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10); INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia) VALUES (currval('demanda_id_seq'), $11, $12, $13); INSERT INTO relacao_ativos (cd_demanda, cd_ativo) VALUES (currval('demanda_id_seq'), $14)";
    //const values = [demanda.solicitante, demanda.processo, demanda.area, demanda.departamento, demanda.usuario_chave, demanda.dono_do_processo, demanda.patrocinador, demanda.cd_status, demanda.cd_input, demanda.saving, demanda.gravidade, demanda.urgencia, demanda.tendencia, demanda.ativo];

    const sql_D = "INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";
    const values_D = [demanda.solicitante, demanda.processo, demanda.area, demanda.departamento, demanda.usuario_chave, demanda.dono_do_processo, demanda.patrocinador, demanda.cd_status, demanda.cd_input, demanda.saving];

    const sql_G = "INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia) VALUES (currval('demanda_id_seq'), $1, $2, $3);";
    const values_G = [demanda.gravidade, demanda.urgencia, demanda.tendencia];

    const sql_A = "INSERT INTO relacao_ativos (cd_demanda, cd_ativo) VALUES (currval('demanda_id_seq'), $1)";
    const values_A = [demanda.ativo];

    cliente.query(sql_D, values_D,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else{
                callback(undefined, res.rows[0])
            }
            //cliente.end()
        })

    cliente.query(sql_G, values_G,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else{
                callback(undefined, res.rows[0])
            }
            //cliente.end()
        })

    cliente.query(sql_A, values_A,
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
    //cliente.end()
}

//LISTAR DEMANDA
function listar(callback){
    const cliente = new Client(conexao)
    cliente.connect()

    const sql = "SELECT D.id, D.solicitante, D.processo, D.area, D.departamento, D.usuario_chave, D.dono_do_processo, D.patrocinador, S.descricao AS status, I.descricao AS dado_entrada, D.saving, GUT.gravidade * GUT.urgencia * GUT.tendencia AS criticidade FROM demanda as D LEFT JOIN status s ON D.cd_status = S.id LEFT JOIN tipo_input I ON D.cd_input = I.id LEFT JOIN gut GUT ON GUT.cd_demanda = D.id";


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

    const sql_D = "UPDATE demanda SET solicitante = $1, processo = $2, area = $3, departamento = $4, usuario_chave = $5, dono_do_processo = $6, patrocinador = $7, cd_status = $8, cd_input = $9, saving = $10 WHERE id = $11 RETURNING *;";
    const values_D = [demanda.solicitante, demanda.processo, demanda.area, demanda.departamento, demanda.usuario_chave, demanda.dono_do_processo, demanda.patrocinador, demanda.cd_status, demanda.cd_input, demanda.saving, id];

    const sql_G = "UPDATE gut SET cd_demanda = $1, gravidade = $2, urgencia = $3, tendencia = $4 WHERE cd_demanda = $1 RETURNING *;";
    const values_G = [id, demanda.gravidade, demanda.urgencia, demanda.tendencia];

    const sql_A = "UPDATE relacao_ativos SET cd_demanda = $1, cd_ativo = $2 WHERE cd_demanda = $1 RETURNING *";
    const values_A = [id, demanda.ativo];

    let resDemanda = []

    cliente.query(sql_D, values_D,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else if(res.rows && res.rows.length > 0){
                resDemanda.push(res.rows[0])
            }
            else{
                callback(erroDemandaNaoEncontrada, undefined)
            }
        })

    cliente.query(sql_G, values_G,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else if(res.rows && res.rows.length > 0){
                resDemanda.push(res.rows[0])
            }
            else{
                callback(erroDemandaNaoEncontrada, undefined)
            }
        })

    cliente.query(sql_A, values_A,
        function (err, res){
            if(err){
                console.log(err)
                callback(erroBD, undefined)
            }
            else if(res.rows && res.rows.length > 0){
                resDemanda.push(res.rows[0])
                callback(undefined, resDemanda)
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
    
    const sql = "SELECT D.id, D.solicitante, D.processo, D.area, D.departamento, D.usuario_chave, D.dono_do_processo, D.patrocinador, S.descricao AS status, I.descricao AS dado_entrada, D.saving, GUT.gravidade * GUT.urgencia * GUT.tendencia AS criticidade FROM demanda as D LEFT JOIN status s ON D.cd_status = S.id LEFT JOIN tipo_input I ON D.cd_input = I.id LEFT JOIN gut GUT ON GUT.cd_demanda = D.id WHERE D.id = $1";
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
//Primeiro deleta da tabela GUT e da Relação_Ativos, depois da Demanda
function deletar(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql_D = "DELETE FROM demanda WHERE id = $1 RETURNING *";
    const values_D = [id];

    const sql_G = "DELETE FROM gut WHERE cd_demanda = $1 RETURNING *";
    const values_G = [id];

    const sql_A = "DELETE FROM relacao_ativos WHERE cd_demanda = $1 RETURNING *";
    const values_A = [id];

    resDemanda = [];

    cliente.query(sql_A, values_A,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                resDemanda.push(res.rows[0]);
                // callback(undefined, demanda);
            }
            else {
                callback(erroDemandaNaoEncontrada, undefined);
            }    
            // cliente.end(); 
        }
    )

    cliente.query(sql_G, values_G,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                resDemanda.push(res.rows[0]);
                // callback(undefined, demanda);
            }
            else {
                callback(erroDemandaNaoEncontrada, undefined);
            }    
            // cliente.end(); 
        }
    ) 
    cliente.query(sql_D, values_D,
        function (err, res) {
            if(err) {
                console.log(err);
                callback(erroBD, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                resDemanda.push(res.rows[0]);
                callback(undefined, resDemanda);
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