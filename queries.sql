SELECT * FROM demanda
SELECT * FROM ativo
SELECT * FROM complexidade
SELECT * FROM gut
SELECT * FROM relacao_ativos
SELECT * FROM sistema
SELECT * FROM status
SELECT * FROM tarefa
SELECT * FROM tipo_input
SELECT * FROM tipo_tarefa


-- =============================== DEMANDAS ===============================
--LISTAR DEMANDAS
SELECT D.id
	, D.solicitante
	, D.processo
	, D.area
	, D.departamento
	, D.usuario_chave
	, D.dono_do_processo
	, D.patrocinador
	, S.descricao AS status
	, I.descricao AS dado_entrada
	, D.saving
FROM demanda as D
	LEFT JOIN status s ON D.cd_status = S.id
	LEFT JOIN tipo_input I ON D.cd_input = I.id


(select tarefa 
		from tarefa 
		left join demanda on tarefa.cd_demanda = demanda.id)

--INSERE DEMANDA
INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
--INSERE GUT
INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia)
VALUES ((SELECT demanda.id FROM demanda ORDER BY demanda.id DESC LIMIT 1), $1, $2, $3)
--INSERE RELAÇÃO ATIVO
INSERT INTO relacao_ativos (cd_demanda, cd_ativo)
VALUES ((SELECT id FROM demanda ORDER BY id DESC LIMIT 1), $2)

-- =============================== DEMANDAS ===============================


--GERAL
SELECT * FROM demanda
SELECT * FROM ativo
SELECT * FROM complexidade
SELECT * FROM gut
SELECT * FROM relacao_ativos
SELECT * FROM sistema
SELECT * FROM status
SELECT * FROM tarefa
SELECT * FROM tipo_input
SELECT * FROM tipo_tarefa

SELECT D.id
	, D.solicitante
	, D.processo
	, D.area
	, D.departamento
	, D.usuario_chave
	, D.dono_do_processo
	, D.patrocinador
	, S.descricao AS status
	, I.descricao AS dado_entrada
	, D.saving
	, GUT.gravidade * GUT.urgencia * GUT.tendencia AS criticidade
FROM demanda as D
	LEFT JOIN status s ON D.cd_status = S.id
	LEFT JOIN tipo_input I ON D.cd_input = I.id
	LEFT JOIN gut GUT ON GUT.cd_demanda = D.id
WHERE D.id = 1

(select tarefa 
		from tarefa 
		left join demanda on tarefa.cd_demanda = demanda.id)

--INSERE DEMANDA
INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)

--INSERE GUT
INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia)
VALUES ((SELECT demanda.id FROM demanda ORDER BY demanda.id DESC LIMIT 1), 1, 2, 3);
--INSERE RELAÇÃO ATIVO
INSERT INTO relacao_ativos (cd_demanda, cd_ativo)
VALUES ((SELECT demanda.id FROM demanda ORDER BY demanda.id DESC LIMIT 1), 7)


--INSERT COMPLETO  'RETURNING id INTO id_demanda'

INSERT INTO demanda (solicitante, processo, area, departamento, usuario_chave, dono_do_processo, patrocinador, cd_status, cd_input, saving) 
VALUES ('Carlos André', 'Processo X', 'Área X', 'Departamento X', 'Usuário X', 'Dono do processo X', 'Patrocinador X', 1, 3, 64); 
INSERT INTO gut (cd_demanda, gravidade, urgencia, tendencia) 
VALUES (currval('demanda_id_seq'), 3, 3, 3); 
INSERT INTO relacao_ativos (cd_demanda, cd_ativo) 
VALUES (currval('demanda_id_seq'), 4);



UPDATE demanda SET solicitante = 'Não sei', processo = 'Não sei', area = 'Não sei', departamento = 'Não sei', usuario_chave = 'Não sei', dono_do_processo = 'Não sei', patrocinador = 'Não sei', cd_status = 5, cd_input = 1, saving = 10 WHERE id = 5 RETURNING *
