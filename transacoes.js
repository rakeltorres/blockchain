class Transacoes {
    constructor(enviou, recebeu, valor) {
        this.enviou = enviou;
        this.recebeu = recebeu;
        this.valor = valor;
        this.timestamp = new Date();
    }
}

module.exports = Transacoes;