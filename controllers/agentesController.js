const { v4: uuidv4 } = require("uuid");
const agentesRepository = require("../repositories/agentesRepository");


function listarAgentes(req, res) {
    let agentes = agentesRepository.findAll();

    const { cargo, sort } = req.query;

    if (cargo) {
        const cargoValido = ["inspetor", "delegado"];
        if (!cargoValido.includes(cargo.toLowerCase())) {
            return res.status(400).json({ message: "Cargo inválido. Use 'inspetor' ou 'delegado'." });
        }

        agentes = agentes.filter(agente => agente.cargo.toLowerCase() === cargo.toLowerCase());
    }

    if (sort) {
        if (sort === "dataDeIncorporacao") {
            agentes.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
        } else if (sort === "-dataDeIncorporacao") {
            agentes.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
        } else {
            return res.status(400).json({ message: "Parâmetro de ordenação inválido. Use 'dataDeIncorporacao' ou '-dataDeIncorporacao'." });
        }
    }

    res.status(200).json(agentes);
}


function buscarAgentePorId(req, res) {
    const agente = agentesRepository.findById(req.params.id);
    if (!agente) {
        return res.status(404).json({ message: "Agente não encontrado." });
    }
    res.status(200).json(agente);
}

function cadastrarAgente(req, res) {
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
        id: uuidv4(),
        nome,
        dataDeIncorporacao,
        cargo
    };

    agentesRepository.create(novoAgente);
    res.status(201).json(novoAgente);
}

function atualizarAgente(req, res) {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo, id: idDoBody } = req.body;

    if (idDoBody && idDoBody !== id) {
        return res.status(400).json({ message: "O campo 'id' não pode ser modificado." });
    }

    if (!agentesRepository.findById(id)) {
        return res.status(404).json({ message: "Agente não encontrado para o id fornecido." });
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const atualizado = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

    res.status(200).json(atualizado);
}


function atualizarParcialAgente(req, res) {
    const { id } = req.params;
    const atualizacao = req.body;

    if ("id" in atualizacao) {
        return res.status(400).json({ message: "O campo 'id' não pode ser modificado." });
    }

    if (Object.keys(atualizacao).length === 0) {
        return res.status(400).json({ message: "É necessário fornecer dados para atualizar." });
    }

    if (!agentesRepository.findById(id)) {
        return res.status(404).json({ message: "Agente não encontrado." });
    }

    const atualizado = agentesRepository.updatePartial(id, atualizacao);

    res.status(200).json(atualizado);
}


function removerAgente(req, res) {
    const removido = agentesRepository.remove(req.params.id);

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
