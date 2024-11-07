const { createHash } = require('crypto');

class Block {
    constructor(index = 0, previousHash = null, transacoes = [], difficulty = 3) {
        this.index = index;
        this.previousHash = previousHash;
        this.transacoes = transacoes;
        this.timestamp = new Date();
        this.difficulty = difficulty;
        this.nonce = 0;
        this.hash = this.calculoHash();

        this.mine();
    }

    calculoHash() {
        const data = this.nonce + this.index + this.timestamp + JSON.stringify(this.transacoes) + this.previousHash;
        return createHash('sha256').update(data).digest('hex');
    }

    mine() {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculoHash();
        }
    }
}

module.exports = Block;