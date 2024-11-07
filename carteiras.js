const { generateKeyPairSync, createHash } = require('crypto');

class Carteira {
    constructor() {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });

        this.publicKey = publicKey.export({ type: 'pkcs1', format: 'pem' });
        this.privateKey = privateKey.export({ type: 'pkcs1', format: 'pem' });
        this.endereco = this.gerarEndereco(this.publicKey);
        this.historicoTransacoes = [];
    }

    gerarEndereco(chavePublica) {
        const hash = createHash('sha256');
        hash.update(chavePublica);
        const enderecoHash = hash.digest('hex').slice(0, 48);
        return '2x' + enderecoHash;
    }

    verificarEndereco(endereco) {
        const regex = /^2x[0-9a-fA-F]{48}$/;
        return regex.test(endereco);
    }

    adicionarTransacao(transacao) {
        this.historicoTransacoes.push(transacao);
    }

    exibirHistorico() {
        return this.historicoTransacoes;
    }
}

module.exports = Carteira;