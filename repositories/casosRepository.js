const db = require('../db/db'); 

async function listarCasos() {
  return await db('casos').select('*');
}

async function casoID(id) {
  return await db('casos').where({ id }).first();
}

async function cadastrarCaso(novoCaso) {
  const [casoInserido] = await db('casos')
    .insert(novoCaso)
    .returning('*');
  return casoInserido;
}

async function findIndexById(id) {
  return await casoID(id);
}

async function deletarPorIndice(id) {
  const deletados = await db('casos')
    .where({ id })
    .del();
  return deletados > 0;
}

async function findByAgenteId(agente_id) {
  return await db('casos').where({ agente_id });
}

module.exports = {
  listarCasos,
  casoID,
  cadastrarCaso,
  findIndexById,
  deletarPorIndice,
  findByAgenteId,
};
