function verificarBodyUsuario(usuario) {
    const { nome, email, senha, nome_loja } = usuario;

    if (!nome) {
        return "O campo nome é obrigatório";
    }

    if (!email) {
        return "O campo email é obrigatório";
    }

    if (!senha) {
        return "O campo senha é obrigatório";
    }

    if (!nome_loja) {
        return "O campo nome_loja é obrigatório";
    }
};

function verificarBodyLogin(usuario) {
    const { email, senha } = usuario;

    if (!email) {
        return "O campo email é obrigatório";
    }

    if (!senha) {
        return "O campo senha é obrigatório";
    }
};

function verificarBodyProduto(produto) {
    const { nome, estoque, preco, descricao } = produto;

    if (!nome) {
        return "O campo nome é obrigatório";
    }

    if (!estoque) {
        return "O campo estoque é obrigatório";
    }

    if (!preco) {
        return "O campo preco é obrigatório";
    }

    if (!descricao) {
        return "O campo descricao é obrigatório";
    }
};


module.exports = {
    verificarBodyUsuario,
    verificarBodyLogin,
    verificarBodyProduto
};