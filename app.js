const express = require('express')
const cors = require('cors')
const tarefaController = require('./controller/tarefa_controller.js');
const demandaController = require('./controller/demanda_controller.js');
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

//====================================================//
//DEMANDAS - DEMANDAS - DEMANDAS - DEMANDAS - DEMANDAS//
//====================================================//
//Inserir
app.post('/api/demanda', demandaController.inserir);

//Listar
app.get('/api/demanda', demandaController.listar);

//BuscarDemandaPorId
app.get('/api/demanda/:id', demandaController.buscarPorId);

//Atualizar
app.put('/api/demanda/:id', demandaController.atualizar);

//Deletar
app.delete('/api/demanda/:id', demandaController.deletar);

//====================================================//
//TAREFA - TAREFA - TAREFA - TAREFA - TAREFA//
//====================================================//
//Inserir
app.post('/api/tarefa', tarefaController.inserir);

//Listar
app.get('/api/tarefasDaDemanda/:id', tarefaController.listar);

//BuscarDemandaPorId
app.get('/api/tarefa/:id', tarefaController.buscarPorId);

//Atualizar
app.put('/api/tarefa/:id', tarefaController.atualizar);

//Deletar
app.delete('/api/tarefa/:id', tarefaController.deletar);

//==========================================//
//LISTEN - LISTEN - LISTEN - LISTEN - LISTEN//
//==========================================//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
