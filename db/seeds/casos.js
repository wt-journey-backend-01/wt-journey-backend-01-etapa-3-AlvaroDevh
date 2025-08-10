/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('casos').del();

  await knex("casos").insert([
    { titulo: "Caso do Roubo", descricao: "Roubo a banco no centro", status: "aberto", agente_id: 1 },
    { titulo: "Caso da Joalheria", descricao: "Assalto à joalheria", status: "solucionado", agente_id: 2 }
  ]);
};