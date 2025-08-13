const db = require('../db/db'); 

async function listarCasos() {
  return await db('casos').select('*');
}

async function casoID(id) {
  return await db('casos').where({ id }).first();
}

async function cadastrarCaso(novoCaso) {
  const [casoInserido] = await db('casos')
    .insert({
      titulo: novoCaso.titulo,
      descricao: novoCaso.descricao,
      status: novoCaso.status,
      agente_id: novoCaso.agente_id
    })
    .returning('*');
  return casoInserido;
}

async function findById (id) {
  return await casoID(id);
}

async function removeById(id) {
  const linhasAfetadas = await db("casos").where({ id }).del();
  return linhasAfetadas > 0; 
}


async function findByAgenteId(agente_id) {
  return await db('casos').where({ agente_id });
}

async function update(id, dados) {
  const [casoAtualizado] = await db("casos").where({ id }).update(dados).returning('*');
  return casoAtualizado || null;
}

async function updatePartial(id, dados) {
  const [casoAtualizado] = await db("casos").where({ id }).update(dados).returning('*');
  return casoAtualizado || null;
}

async function listarCasosComFiltros({ status, agente_id, q }) {
  let query = db('casos');

  if (status) {
    query = query.where('status', status);
  }

  if (agente_id) {
    query = query.where('agente_id', agente_id);
  }

  if (q) {
    query = query.where(function() {
      this.where('titulo', 'ilike', `%${q}%`)
          .orWhere('descricao', 'ilike', `%${q}%`);
    });
  }

  return await query.select('*');
}


module.exports = {
  listarCasos,
  casoID,
  cadastrarCaso,
  findById ,
  removeById,
  findByAgenteId,
  updatePartial,
  update,
  listarCasosComFiltros,

};
