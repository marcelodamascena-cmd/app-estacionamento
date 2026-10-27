"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estacionamento = void 0;
class Estacionamento {
    //Os arreys são privados: Só os métodos da classe podem altera-lo
    veiculo = [];
    historico = [];
    capacidade;
    constructor(capacidade) {
        if (!Number.isSafeInteger(capacidade) || capacidade <= 0) {
            throw new Error("A capacidade deve ser um número inteiro maior que zero");
        }
        this.capacidade = capacidade;
    }
    consultarVagasDisponiveis() {
        return this.capacidade - this.veiculo.length;
    }
    registrarEntrada(veiculo) {
        //Verifica o numero de vagas disponível
        if (this.consultarVagasDisponiveis() === 0) {
            throw new Error("Estácionamento lotado! Não há vagas");
        }
        //Verifica se tem veiculo estácionado com a mesma placa
        if (this.veiculo.some(item => item.placa === veiculo.placa)) {
            throw new Error("Esta placa já está estacionada");
        }
        this.veiculo.push(veiculo);
    }
    registrarSaida(placa, horarioSaida = new Date()) {
        const placaBusca = placa.trim().toUpperCase().replace(/[\s-]/g, "");
        const indice = this.veiculo.findIndex(item => item.placa === placaBusca);
        if (indice === -1) {
            throw new Error("Veículo não encontrado no estacionamento");
        }
        const veiculo = this.veiculo[indice];
        const registro = {
            placa: veiculo.placa,
            tipo: veiculo.obterTipo(),
            entrada: veiculo.horarioEntrada,
            saida: new Date(horarioSaida.getTime()),
            minutosPermanencia: veiculo.calcularMinutosCobradas(horarioSaida),
            horasCobradas: veiculo.calcularHorasCobradas(horarioSaida),
            valorPago: veiculo.calcularTarifa(horarioSaida)
        };
        this.veiculo.splice(indice, 1);
        this.historico.push(registro);
        return {
            ...registro,
            entrada: new Date(registro.entrada),
            saida: new Date(registro.saida)
        };
    }
    listarVeiculos() {
        return [...this.veiculo];
    }
    gerarRelatorio() {
        const registros = this.historico.map(registro => ({
            ...registro,
            entrada: new Date(registro.entrada),
            saida: new Date(registro.saida)
        }));
        return {
            totalAtendidos: this.historico.length,
            valorArrecadado: this.historico.reduce((total, registro) => total + registro.valorPago, 0),
            registros
        };
    }
}
exports.Estacionamento = Estacionamento;
