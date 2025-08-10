const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");

/**
 * @swagger
 * tags:
 *  name: agentes
 *  description: rota Agentes
 */
/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: "Listar todos os agentes"
 *     tags: [agentes]
 *     description: "Retorna todos os agentes, com filtros opcionais por cargo e ordenação."
 *     parameters:
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: "Filtrar por cargo (ex: inspetor, delegado)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: "Ordenar por data de incorporação ('dataDeIncorporacao' ou '-dataDeIncorporacao')"
 *     responses:
 *       200:
 *         description: "Lista de agentes retornada com sucesso"
 */
router.get("/agentes", agentesController.listarAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: "Buscar agente por ID"
 *     tags: [agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID do agente"
 *     responses:
 *       200:
 *         description: "Agente encontrado"
 *       404:
 *         description: "Agente não encontrado"
 */
router.get("/agentes/:id", agentesController.buscarAgentePorId);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: "Cadastrar um novo agente"
 *     tags: [agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - dataDeIncorporacao
 *               - cargo
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       201:
 *         description: "Agente criado com sucesso"
 *       400:
 *         description: "Erro de validação"
 */
router.post("/agentes", agentesController.cadastrarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: "Atualizar completamente um agente"
 *     tags: [agentes]
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
 *               - nome
 *               - dataDeIncorporacao
 *               - cargo
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       200:
 *         description: "Agente atualizado com sucesso"
 *       400:
 *         description: "Erro de validação"
 *       404:
 *         description: "Agente não encontrado"
 */
router.put("/agentes/:id", agentesController.atualizarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: "Atualizar parcialmente um agente"
 *     tags: [agentes]
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
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *                 enum: [inspetor, delegado]
 *     responses:
 *       200:
 *         description: "Agente atualizado parcialmente com sucesso"
 *       400:
 *         description: "Erro de validação"
 *       404:
 *         description: "Agente não encontrado"
 */
router.patch("/agentes/:id", agentesController.atualizarParcialAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: "Remover agente"
 *     tags: [agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: "Agente removido com sucesso"
 *       404:
 *         description: "Agente não encontrado"
 */
router.delete("/agentes/:id", agentesController.removerAgente);

module.exports = router;
