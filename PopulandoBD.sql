select * from sistema
select * from ativo
select * from status
select * from tipo_input
select * from demanda
select * from relacao_ativos
select * from gut
select * from complexidade
select * from tipo_tarefa
select * from tarefa

--SISTEMA
INSERT INTO sistema (nome)
VALUES ('TOTVS'),('Senior'),('Matrix'),('Power BI'),('Sysphera'),('Outlook');

--ATIVO
INSERT INTO ativo (modulo, impeditivo, cd_sistema)
VALUES ('Contas a receber - Retorno',false,1)
	,('WGEN200 - Cockpit de engenharia',true,1)
	,('Ajuste de ponto',false,2)
	,('Lançamento de outras bases',false,2)
	,('eSocial',false,2)
	,('Barberan',false,3)
	,('Envio de e-mail',false,6)
	,('Leitura de e-mail',false,6);

--STATUS
INSERT INTO status (descricao)
VALUES ('Pendente'), ('Em mapeamento'), ('Em desenvolvimento'), ('Concluído'), ('Indeferido');

--INPUT
INSERT INTO tipo_input (descricao)
VALUES ('CSV'), ('Arquivo de texto'), ('Excel'), ('E-mail'), ('PDF'), ('Diretório'), ('Imagem');

--DEMANDA
INSERT INTO demanda (solicitante
					 , processo
					 , area
					 , departamento
					 , usuario_chave
					 , dono_do_processo
					 , patrocinador
					 , cd_status
					 , cd_input
					 , saving)
VALUES ('Fernando Tonetto'
		, 'Consulta Jurídica'
		, 'Jurídico'
		, 'Monitoramento'
		, 'Eduardo Marzek'
		, 'Luiz Paulo'
		, 'Maicon Ignoato'
		, 4
		, 3
		,11.5);

--RELACAO_ATIVOS
INSERT INTO relacao_ativos (cd_demanda, cd_ativo)
VALUES (1,8);

--GUT (criticidade = G*U*T)
INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia)
VALUES (1,1,2,3);

--COMPLEXIDADE
INSERT INTO complexidade (descricao)
VALUES ('Muito baixa')
	, ('Baixa')
	, ('Média')
	, ('Alta')
	, ('Muito alta');
	
--TIPO DE TAREFA
INSERT INTO tipo_tarefa (descricao)
VALUES ('Telas')
	, ('Sites')
	, ('Regras')
	, ('Programas')
	,('Serviços')

--TAREFA
INSERT INTO tarefa (cd_demanda, descricao, cd_tipo, cd_complexidade, antecessora, sucessora)
--VALUES (1,'Ler lista de processos de cada tribunal', 3, 2, 0, 0);
VALUES (1,'Consultar status de cada processo no site do tribunal', 2, 4, 1, 0);