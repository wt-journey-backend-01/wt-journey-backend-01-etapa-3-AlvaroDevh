/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("casos").del();

  const agentes = await knex("agentes").select("id", "nome");

  await knex("casos").insert([
    { titulo: "Caso do Roubo", descricao: "Roubo a banco no centro", status: "aberto", agente_id: agentes[0].id },
    { titulo: "Caso da Joalheria", descricao: "Assalto à joalheria", status: "solucionado", agente_id: agentes[1].id }
  ]);
};
