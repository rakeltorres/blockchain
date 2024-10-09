const crypto = require('crypto');

class Transacoes {
    constructor(enviou, recebeu, valor) {
        this.enviou = enviou;
        this.recebeu = recebeu;
        this.valor = valor;
    }
}

class Block{
    constructor(index = 0, timestamp, transacoes, anteriorHash = null) {
        this. index = index;
        this.time = timestamp;
        this.transacoes = transacoes;
        this.anteriorHash = anteriorHash;
        this.hash = this.calculoHash();
    }

    calculoHash() {
        const data = this.index + this.timestamp + this.transacoes + this.anteriorHash;
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), [], '0');
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.anteriorHash = this.getLatesBlock().hash;
        newBlock.hash = newBlock.calculoHash();
        this.chain.push(newBlock);
    }

    isChainvalid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const anteriorHash = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculoHash()) {
                return false;
            }

            if (currentBlock.anteriorHash !== anteriorHash.hash) {
                return false;
            }
        }
        return true;
    }
}

let myBlockchain = new Blockchain();

const transacoes1 = new Transacoes('Alice', 'Bob', 50);
const transacoes2 = new Transacoes('Bob', 'charlie', 30);

myBlockchain.addBlock(new Block(1, Date.now(), [transacoes1]));
myBlockchain.addBlock(new Block(2, Date.now(), [transacoes2]));

console.log(JSON.stringify(myBlockchain,null, 4));

console.log('A blockchain é válida? ' + myBlockchain.isChainvalid());
