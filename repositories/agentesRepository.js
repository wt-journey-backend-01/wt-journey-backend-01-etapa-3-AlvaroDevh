// db
const db = require('../db/db'); 

async function findAll() {
  return await db('agentes').select('*');
}

async function findById(id) {
  return await db('agentes').where({ id }).first();
}

async function create(data) {
  const [novoAgente] = await db('agentes')
    .insert(data)
    .returning('*');
  return novoAgente;
}

async function update(id, novoAgente) {
  const [agenteAtualizado] = await db('agentes')
    .where({ id })
    .update(novoAgente)
    .returning('*');
  return agenteAtualizado || null;
}

async function updatePartial(id, atualizacao) {
  const [agenteAtualizado] = await db('agentes')
    .where({ id })
    .update(atualizacao)
    .returning('*');
  return agenteAtualizado || null;
}

async function remove(id) {
  const deletados = await db('agentes')
    .where({ id })
    .del();
  return deletados > 0;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove
};
