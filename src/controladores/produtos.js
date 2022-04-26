const knex = require('../conexao');
const { verificarBodyProduto } = require('../filtros/verificarBodyRequisicao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { categoria } = req.query;

    try {

        if (categoria) {
            const produtos = await knex('produtos').where({ usuario_id: usuario.id }).andWhereILike('nome', `%${categoria}%`);

            return res.status(200).json(produtos);
        }

        const produtos = await knex('produtos').where({ usuario_id: usuario.id });

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {

        const produto = await knex('produtos')
            .where({
                usuario_id: usuario.id,
                id
            }).first('*');

        if (!produto) {
            return res.status(404).json({ "mensagem": "Produto não encontrado" });
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    const erro = verificarBodyProduto(req.body);

    if (erro) {
        return res.status(404).json({ "mensagem": erro })
    }

    try {

        const produto = await knex('produtos')
            .insert({
                usuario_id: usuario.id,
                nome,
                estoque,
                preco,
                categoria: !categoria ? null : categoria,
                descricao,
                imagem: !imagem ? null : imagem
            });

        if (produto === 0) {
            return res.status(400).json({ "mensagem": "O produto não foi cadastrado" });
        }

        return res.status(200).json({ "mensagem": "O produto foi cadastrado com sucesso." });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json({ "mensagem": "É obrigatório informar ao menos um campo para atualização" });
    }

    try {

        const produto = await knex('produtos').where({ id }).first('*');

        if (!produto) {
            return res.status(404).json({ "mensagem": "Produto não encontrado" });
        }

        const novosDadoProduto = {
            nome: !nome ? produto.nome : nome,
            estoque: !estoque ? produto.estoque : estoque,
            categoria: !categoria ? produto.categoria : categoria,
            descricao: !descricao ? produto.descricao : descricao,
            preco: !preco ? produto.preco : preco,
            imagem: !imagem ? produto.imagem : imagem
        }

        const produtoAtualizado = await knex('produtos').update(novosDadoProduto).where({ id, usuario_id: usuario.id });

        if (!produtoAtualizado) {
            return res.status(400).json({ "mensagem": "O produto não foi atualizado." });
        }

        return res.status(200).json({ "mensagem": "Produto foi atualizado com sucesso." });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await knex('produtos').where({ id, usuario_id: usuario.id }).first('*');

        if (!produto) {
            return res.status(404).json({ "mensagem": "Produto não encontrado" });
        }

        const produtoExcluido = await knex('produtos').where({ id, usuario_id: usuario.id }).del();

        if (!produtoExcluido) {
            return res.status(400).json({ "mensagem": "O produto não foi excluido" });
        }

        return res.status(200).json({ "mensagem": "Produto excluido com sucesso" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}