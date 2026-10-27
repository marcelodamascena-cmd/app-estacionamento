"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veiculo = void 0;
class Veiculo {
    _placa;
    _horaEntrada;
    constructor(placa, horarioEntrada = new Date) {
        const placaNormalizada = placa.trim().toUpperCase().replace(/[\s-]/g, "");
        const placaValida = /^[A-Z]{3}[0-9]([0-9]|[A-Z])[0-9]{2}$/.test(placaNormalizada);
        if (!placaValida) {
            throw new Error("Placa inválida. Exemplos: ABC-123 ou ABC1D23.");
        }
        if (Number.isNaN(horarioEntrada.getTime())) {
            throw new Error("Data de entrada inválida");
        }
        this._placa = placaNormalizada;
        this._horaEntrada = horarioEntrada.getTime();
    }
    //Metodos de Encapsulamento para consultar 
    get placa() {
        return this._placa;
    }
    get horarioEntrada() {
        return new Date(this._horaEntrada);
    }
    calcularHorasCobradas(horarioSaida) {
        const duracao = horarioSaida.getTime() - this._horaEntrada;
        if (!Number.isFinite(duracao) || duracao < 0) {
            throw new Error("O horário de saída não pode ser anterior a entrada");
        }
        const umaHora = 60 * 60 * 1000;
        return Math.max(1, Math.ceil(duracao / umaHora));
    }
    calcularMinutosCobradas(horarioSaida) {
        const duracao = horarioSaida.getTime() - this._horaEntrada;
        if (!Number.isFinite(duracao) || duracao < 0) {
            throw new Error("O horário de saída não pode ser anterior a entrada");
        }
        return Math.ceil(duracao / (60 * 1000));
    }
}
exports.Veiculo = Veiculo;
