"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moto = void 0;
const Veiculo_1 = require("./Veiculo");
class Moto extends Veiculo_1.Veiculo {
    getTipo() {
        return "Moto";
    }
    getTarifaPorHora() {
        return 7;
    }
}
exports.Moto = Moto;
