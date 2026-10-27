"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const Veiculo_1 = require("./Veiculo");
class Moto extends Veiculo_1.Veiculo {
    constructor(placa, horarioEntrada = new Date()) {
        super(placa, horarioEntrada);
    }
    obterTipo() {
        return "Moto";
    }
    calcularTarifa(horarioSaida) {
        return this.calcularHorasCobradas(horarioSaida) * 7;
    }
}
exports.Moto = Moto;
