"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilitario = void 0;
const Veiculo_1 = require("./Veiculo");
class Utilitario extends Veiculo_1.Veiculo {
    constructor(placa, horarioEntrada = new Date()) {
        super(placa, horarioEntrada);
    }
    obterTipo() {
        return "Utilitário";
    }
    calcularTarifa(horarioSaida) {
        return this.calcularHorasCobradas(horarioSaida) * 18;
    }
}
exports.Utilitario = Utilitario;
