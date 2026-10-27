"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carro = void 0;
const Veiculo_1 = require("./Veiculo");
class Carro extends Veiculo_1.Veiculo {
    constructor(placa, horarioEntrada = new Date()) {
        super(placa, horarioEntrada);
    }
    obterTipo() {
        return "Carro";
    }
    calcularTarifa(horarioSaida) {
        return this.calcularHorasCobradas(horarioSaida) * 12;
    }
}
exports.Carro = Carro;
