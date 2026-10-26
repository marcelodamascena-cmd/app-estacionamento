"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carro = void 0;
const Veiculo_1 = require("./Veiculo");
class Carro extends Veiculo_1.Veiculo {
    getTipo() {
        return "Carro";
    }
    getTarifaPorHora() {
        return 12;
    }
}
exports.Carro = Carro;
