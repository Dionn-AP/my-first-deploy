const knex = require('../conexao');
const bcrypt = require('bcrypt');
const { verificarBodyUsuario } = require('../filtros/verificarBodyRequisicao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    const erro = verificarBodyUsuario(req.body);

    if (erro) {
        return res.status(404).json({ "mensagem": erro })
    }

    try {
        const emailExistente = await knex('usuarios').where({ email }).first();

        if (emailExistente) {
            return res.status(400).json({ "mensagem": "O email já existe" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: senhaCriptografada,
                nome_loja
            })

        if (usuario === 0) {
            return res.status(400).json({ "mensagem": "O usuário não foi cadastrado." });
        }

        return res.status(200).json({ "mensagem": "O usuario foi cadastrado com sucesso!" });

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterPerfil = async (req, res) => {

    return res.status(200).json({
        id: req.usuario.id,
        nome: req.usuario.nome,
        email: req.usuario.email
    });
};

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(404).json({ "mensagem": "É obrigatório informar ao menos um campo para atualização" });
    }

    try {
        if (email) {
            if (email !== req.usuario.email) {
                const emailExistente = await knex('usuarios').where({ email }).first();

                if (emailExistente) {
                    return res.status(400).json({ "mensagem": "O email já existe" });
                }
            }
        }

        const novosDadoUsuario = {
            nome: !nome ? req.usuario.nome : nome,
            email: !email ? req.usuario.email : email,
            senha: !senha ? req.usuario.senha : await bcrypt.hash(senha, 10),
            nome_loja: !nome_loja ? req.usuario.nome_loja : nome_loja
        }

        const usuarioAtualizado = await knex('usuarios').update(novosDadoUsuario).where({ id: req.usuario.id });

        if (!usuarioAtualizado) {
            return res.status(400).json({ "mensagem": "O usuario não foi atualizado" });
        }

        return res.status(200).json({ "mensagem": "Usuario foi atualizado com sucesso." });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
};