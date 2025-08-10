/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex("casos").del();
  await knex("agentes").del();

  await knex("agentes").insert([
    { nome: "João Silva", dataDeIncorporacao: "2020-01-10", cargo: "Investigador" },
    { nome: "Maria Souza", dataDeIncorporacao: "2018-06-15", cargo: "Delegada" }
  ]);

  await knex("casos").insert([
    { titulo: "Caso do Roubo", descricao: "Roubo a banco no centro", status: "aberto", agente_id: 1 },
    { titulo: "Caso da Joalheria", descricao: "Assalto à joalheria", status: "solucionado", agente_id: 2 }
  ]);
};
