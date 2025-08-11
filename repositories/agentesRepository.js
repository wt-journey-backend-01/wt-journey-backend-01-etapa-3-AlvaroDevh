// db
const db = require('../db/db'); 

async function findAll() {
  return await db('agentes').select('*');
}

async function findById(id) {
  return await db('agentes').where({ id }).first();
}

async function create(data) {
  const [id] = await db('agentes').insert({
    nome: data.nome,
    dataDeIncorporacao: data.dataDeIncorporacao,
    cargo: data.cargo
  }).returning('id');

  return findById(id);
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

async function findAllFiltered({ cargo, sort }) {
  let query = db("agentes");

  if (cargo) {
    query = query.whereRaw("LOWER(cargo) = ?", cargo.toLowerCase());
  }

  if (sort === "dataDeIncorporacao") {
    query = query.orderBy("dataDeIncorporacao", "asc");
  } else if (sort === "-dataDeIncorporacao") {
    query = query.orderBy("dataDeIncorporacao", "desc");
  }

  return await query.select("*");
}


module.exports = {
  findAll,
  findById,
  create,
  update,
  updatePartial,
  remove,
  findAllFiltered
};
