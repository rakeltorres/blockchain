const Blockchain = require('./blockchain.js');
const Block = require('./block.js');
const Transacoes = require('./transacoes.js');
const Carteira = require('./carteiras.js');

const myBlockchain = new Blockchain();

const carteiraAlice = new Carteira();
const carteiraBob = new Carteira();
const carteiraCharlie = new Carteira();

const transacoes1 = new Transacoes(carteiraAlice.endereco, carteiraBob.endereco, 50);
const transacoes2 = new Transacoes(carteiraBob.endereco, carteiraCharlie.endereco, 30);

function validarTransacao(transacao) {
    if (!carteiraAlice.verificarEndereco(transacao.enviou)) {
        console.log('Endereço do remetente inválido!');
        return false;
    }
    if (!carteiraBob.verificarEndereco(transacao.recebeu)) {
        console.log('Endereço do destinatário inválido!');
        return false;
    }
    return true;
}

if (validarTransacao(transacoes1)) {
    carteiraAlice.adicionarTransacao(transacoes1);
    carteiraBob.adicionarTransacao(transacoes1);
    myBlockchain.addBlock(new Block(1, myBlockchain.getLatesBlock().hash, [transacoes1], myBlockchain.difficulty));
}

if (validarTransacao(transacoes2)) {
    carteiraBob.adicionarTransacao(transacoes2);
    carteiraCharlie.adicionarTransacao(transacoes2);
    myBlockchain.addBlock(new Block(2, myBlockchain.getLatesBlock().hash, [transacoes2], myBlockchain.difficulty));
}

console.log(JSON.stringify(myBlockchain, null, 4));

console.log('A blockchain é válida? ' + myBlockchain.isChainValid());

console.log('Histórico de transações da Alice:', carteiraAlice.exibirHistorico());
console.log('Histórico de transações do Bob:', carteiraBob.exibirHistorico());
console.log('Histórico de transações do Charlie:', carteiraCharlie.exibirHistorico());