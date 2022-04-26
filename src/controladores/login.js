const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');
const { verificarBodyLogin } = require('../filtros/verificarBodyRequisicao');

const login = async (req, res) => {
    const { email, senha } = req.body;

    const erro = verificarBodyLogin(req.body);

    if (erro) {
        return res.status(404).json({ "mensagem": erro })
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(400).json({ "mensagem": "O usuario não foi encontrado" });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ "mensagem": "Email e senha não confere" });
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}