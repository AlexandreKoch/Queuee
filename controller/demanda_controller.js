const cadastroDemanda = require('../negocio/demanda_negocio.js');

//INSERIR DEMANDA
exports.inserir = (req,res) => {
    const demanda = req.body;

    cadastroDemanda.inserir(demanda,
        function(err, demandaInserida) {
            if(err){
                res.status(err.numero).json({erro: err.mensagem});
            }
            else{
                res.status(201).json(demandaInserida);
            }
        });
}

//LISTAR DEMANDAS
exports.listar = (req,res) => {
    const idOrder = req.params.id;
    cadastroDemanda.listar(idOrder, function(err, demandas){
        console.log("Listar demandas: ");
        if(err) {
            console.log('Msg_1')
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            console.log('Msg_2')
            res.json(demandas);
        }
    });
}


//BUSCAR DEMANDAS
exports.buscarPorId = (req,res) => {
    const id = req.params.id;
    cadastroDemanda.buscarPorId(id, function(err, demanda){
        if(err){
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            res.json(demanda);
        }
    })
}

//ATUALIZAR DEMANDAS
exports.atualizar = (req,res) => {
    const id = req.params.id;
    const demanda = req.body;
    cadastroDemanda.atualizar(id,demanda,
        function(err,demandaAlterada){
            if(err){
                res.status(err.numero).json({erro: err.mensagem});
            }
            else{
                res.json(demandaAlterada);
            }
        })
}

//DELETAR DEMANDAS
exports.deletar = (req,res) => {
    const id = req.params.id;
    cadastroDemanda.deletar(id, function (err, demanda){
        if(err){
            res.status(err.numero).json({erro: err.mensagem});
        }
        else{
            res.json(demanda);
        }
    })
}