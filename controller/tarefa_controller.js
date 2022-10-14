const cadastroTarefa = require('../negocio/tarefa_negocio.js');

//INSERIR TAREFAS
exports.inserir = (req,res) => {
    const tarefa = req.body;

    cadastroTarefa.inserir(tarefa,
        function(err, tarefaInserida) {
            if(err){
                res.status(err.numero).json({erro: err.mensagem});
            }
            else{
                res.status(201).json(tarefaInserida);
            }
        });
}

//LISTAR TAREFAS
exports.listar = (req,res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    cadastroTarefa.listar(function(err, tarefas){
        console.log("Listar tarefas: ");
        if(err) {
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            res.json(tarefas);
        }
    });
}


//BUSCAR TAREFAS
exports.buscarPorId = (req,res) => {
    const id = req.params.id;
    cadastroTarefa.buscarPorId(id, function(err, tarefa){
        if(err){
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            res.json(tarefa);
        }
    })
}

//ATUALIZAR TAREFAS
exports.atualizar = (req,res) => {
    const id = req.params.id;
    const tarefa = req.body;
    cadastroTarefa.atualizar(id,tarefa,
        function(err,tarefaAlterada){
            if(err){
                res.status(err.numero).json({erro: err.mensagem});
            }
            else{
                res.json(tarefaAlterada);
            }
        })
}

//DELETAR TAREFAS
exports.deletar = (req,res) => {
    const id = req.params.id;
    cadastroTarefa.deletar(id, function (err, tarefa){
        if(err){
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            res.json(tarefa);
        }
    })
}