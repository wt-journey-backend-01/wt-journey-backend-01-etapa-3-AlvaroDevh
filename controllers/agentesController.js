const agentesRepository = require("../repositories/agentesRepository");


async function listarAgentes(req, res) {
  const { cargo, sort } = req.query;
  const agentes = await agentesRepository.findAllFiltered({ cargo, sort });
  res.json(agentes);
}



async function buscarAgentePorId(req, res) {
    const agente = await agentesRepository.findById(req.params.id);
    if (!agente) {
        return res.status(404).json({ message: "Agente não encontrado." });
    }
    res.status(200).json(agente);
}

async function cadastrarAgente(req, res) {
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!isValidDate(dataDeIncorporacao)) {
        return res.status(400).json({ message: "dataDeIncorporacao inválida ou no futuro." });
    }

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ message: "Nome é obrigatório." });
    }

    const cargosValidos = ["inspetor", "delegado"];
    if (!cargo || !cargosValidos.includes(cargo.toLowerCase())) {
        return res.status(400).json({ message: "Cargo inválido ou obrigatório. Use 'inspetor' ou 'delegado'." });
    }
    const novoAgente = {
        nome,
        dataDeIncorporacao,
        cargo
    };

    const criado = await agentesRepository.create(novoAgente);
    res.status(201).json(criado);
}

async function atualizarAgente(req, res) {
const id = Number(req.params.id);
if (isNaN(id)) {
  return res.status(400).json({ message: "ID inválido." });
}
    const { nome, dataDeIncorporacao, cargo, id: idDoBody } = req.body;

    if (idDoBody && idDoBody !== id) {
        return res.status(400).json({ message: "O campo 'id' não pode ser modificado." });
    }

    const agenteExistente = await agentesRepository.findById(id); 
    if (!agenteExistente) {
        return res.status(404).json({ message: "Agente não encontrado para o id fornecido." });
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const atualizado = await agentesRepository.update(id, { nome, dataDeIncorporacao, cargo }); 

    res.status(200).json(atualizado);
}


async function atualizarParcialAgente(req, res) {
const id = Number(req.params.id);
if (isNaN(id)) {
  return res.status(400).json({ message: "ID inválido." });
}
    const atualizacao = req.body;

    if ("id" in atualizacao) {
        return res.status(400).json({ message: "O campo 'id' não pode ser modificado." });
    }

    if (Object.keys(atualizacao).length === 0) {
        return res.status(400).json({ message: "É necessário fornecer dados para atualizar." });
    }

    const agenteExistente = await agentesRepository.findById(id); 
    if (!agenteExistente) {
        return res.status(404).json({ message: "Agente não encontrado." });
    }

    const atualizado = await agentesRepository.updatePartial(id, atualizacao); 

    res.status(200).json(atualizado);
}

async function removerAgente(req, res) {
    const removido = await agentesRepository.remove(req.params.id);

    if (!removido) {
        return res.status(404).json({ message: "Agente não encontrado." });
    }

    res.status(204).send();
}

 function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const date = new Date(dateString);
    const now = new Date();
    return date instanceof Date && !isNaN(date) && date <= now;
}

module.exports = {
    listarAgentes,
    buscarAgentePorId,
    cadastrarAgente,
    atualizarAgente,
    atualizarParcialAgente,
    removerAgente
};
