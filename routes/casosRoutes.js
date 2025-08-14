const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

/**
 * @swagger
 * tags:
 *  name: Casos
 *  description: rota casos
 */


/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos, com filtros opcionais por status, agente_id ou busca textual
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: "Filtrar casos pelo status (ex: aberto, solucionado)"
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Filtrar casos por agente responsável
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Busca textual no título ou descrição
 *     responses:
 *       200:
 *         description: Lista de casos
 */
router.get("/", casosController.listarCasos);

/**
 * @swagger
 * /casos/search:
 *   get:
 *     summary: Pesquisa full-text nos casos
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Palavra-chave para busca no título ou descrição
 *     responses:
 *       200:
 *         description: Casos encontrados com base na busca
 *       400:
 *         description: Query string 'q' ausente ou inválida
 */

router.get("/search", casosController.buscarCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Obtém um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 */
router.get('/:id', casosController.getCasoID);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Cadastra um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *               - agente_id
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [aberto, solucionado]
 *               agente_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caso cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou incompletos
 *       404:
 *         description: Agente não encontrado
 */
router.post('/', casosController.cadastrarCaso);


/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza completamente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - status
 *               - agente_id
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [aberto, solucionado]
 *               agente_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Caso não encontrado
 */
router.put('/:id', casosController.editarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [aberto, solucionado]
 *               agente_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       400:
 *         description: Status inválido
 *       404:
 *         description: Caso não encontrado
 */

router.patch('/:id', casosController.atualizarParcialCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Remove um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso removido com sucesso
 *       404:
 *         description: Caso não encontrado
 */

router.delete('/:id', casosController.deletarCaso);

/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Retorna os dados completos do agente responsável por um caso específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Dados do agente responsável
 *       404:
 *         description: Caso ou agente não encontrado
 */
router.get("/:caso_id/agente", casosController.buscarAgenteDoCaso);


module.exports = router;
