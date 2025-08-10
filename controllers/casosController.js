const casosRepository = require("../repositories/casosRepository")
const agentesRepository = require("../repositories/agentesRepository");


async function listarCasos(req, res) {
    const { status, agente_id, q } = req.query;

    let resultado =  await casosRepository.listarCasos();

    if (status) {
        resultado = resultado.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }

    if (agente_id) {
        resultado = resultado.filter(c => c.agente_id === agente_id);
    }

    if (q) {
        const termo = q.toLowerCase();
        resultado = resultado.filter(c =>
            c.titulo.toLowerCase().includes(termo) ||
            c.descricao.toLowerCase().includes(termo)
        );
    }

    res.status(200).json(resultado);
}


async function getCasoID(req, res) {
    const id = req.params.id;
    const caso = await casosRepository.casoID(id);

    if (!caso) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }

    res.status(200).json(caso);
}
async function cadastrarCaso(req, res) {

    const { titulo, descricao, status, agente_id } = req.body;

    const agenteExiste = await agentesRepository.findById(agente_id);
    if (!agenteExiste) {
        return res.status(404).json({ message: "Agente responsável não encontrado." });
    }
    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (status !== "aberto" && status !== "solucionado") {
        return res.status(400).json({ message: 'Status deve ser "aberto" ou "solucionado".' });
    }

    const novoCaso = {
        titulo,
        descricao,
        status,
        agente_id
    };
       await casosRepository.cadastrarCaso(novoCaso); 
    res.status(201).json(novoCaso);

}

async function editarCaso(req, res) {
    const id = req.params.id;
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (status !== "aberto" && status !== "solucionado") {
        return res.status(400).json({ message: 'Status deve ser "aberto" ou "solucionado".' });
    }

    const caso = await casosRepository.casoID(id);  
    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }

    caso.titulo = titulo;
    caso.descricao = descricao;
    caso.status = status;
    caso.agente_id = agente_id;

    res.status(200).json(caso);
}

async function atualizarParcialCaso(req, res) {
    const id = req.params.id;
    const caso = await casosRepository.casoID(id);

    if (!caso) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }

    const { titulo, descricao, status, agente_id } = req.body;

    if (titulo !== undefined) caso.titulo = titulo;
    if (descricao !== undefined) caso.descricao = descricao;
    if (status !== undefined) {
        if (status !== "aberto" && status !== "solucionado") {
            return res.status(400).json({ message: 'Status deve ser "aberto" ou "solucionado".' });
        }
        caso.status = status;
    }
    if (agente_id !== undefined) caso.agente_id = agente_id;

    res.status(200).json(caso);
}

async function deletarCaso(req, res) {
    const id = req.params.id;
    const index = await casosRepository.findIndexById(id);

    if (index === -1) {
        return res.status(404).json({ message: 'Caso não encontrado.' });
    }

    casosRepository.deletarPorIndice(index);
    res.status(204).send();
}
async function listarCasosPorAgente(req, res) {
    const { agente_id } = req.query;

    if (!agente_id) {
        return res.status(400).json({ message: "O parâmetro agente_id é obrigatório." });
    }

    const casosFiltrados = await casosRepository.findByAgenteId(agente_id);  

    res.status(200).json(casosFiltrados);
}


async function buscarAgenteDoCaso(req, res) {
    const { caso_id } = req.params;

    const caso =  await casosRepository.findById(caso_id);
    if (!caso) {
        return res.status(404).json({ message: "Caso não encontrado." });
    }

    const agente = await agentesRepository.findById(caso.agente_id); 
    if (!agente) {
        return res.status(404).json({ message: "Agente responsável não encontrado." });
    }

    res.status(200).json(agente);
}



async function buscarCasos(req, res) {
    const { q } = req.query;

    if (!q || q.trim() === "") {
        return res.status(400).json({ message: "A query string 'q' é obrigatória." });
    }

    const termo = q.toLowerCase();
    const resultadoCompleto = await casosRepository.listarCasos();

    const resultado = resultadoCompleto.filter(caso =>
        caso.titulo.toLowerCase().includes(termo) ||
        caso.descricao.toLowerCase().includes(termo)
    );

    res.status(200).json(resultado);
}


module.exports = {
    listarCasos,
    getCasoID,
    cadastrarCaso,
    editarCaso,
    atualizarParcialCaso,
    deletarCaso,
    listarCasosPorAgente,
    buscarAgenteDoCaso,
    buscarCasos
}

