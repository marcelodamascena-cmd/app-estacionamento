"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:readline/promises");
const node_process_1 = require("node:process");
const Carro_1 = require("./models/Carro");
const Moto_1 = require("./models/Moto");
const Utilitario_1 = require("./models/Utilitario");
const Estacionamento_1 = require("./services/Estacionamento");
const teclado = (0, promises_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout });
function moeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function dataHora(data) {
    return data.toLocaleString("pt-BR");
}
async function perguntarCapacidade() {
    while (true) {
        const resposta = (await teclado.question("Capacidade total do estacionamento: ")).trim();
        const capacidade = Number(resposta);
        if (/^[1-9][0-9]*$/.test(resposta) && Number.isInteger(capacidade)) {
            return capacidade;
        }
        console.log("Informe um número inteiro maior que zero.");
    }
}
async function entradaVeiculo(estacionamento) {
    console.log("\n1 - Carro | 2 - Moto | 3 - Utilitário");
    const tipo = (await teclado.question("Tipo do veículo: ")).trim();
    if (tipo !== "1" && tipo !== "2" && tipo !== "3") {
        console.log("Tipo de veículo inválido.");
        return;
    }
    const placa = await teclado.question("Placa do veículo: ");
    let veiculo;
    // Instancia o veículo de acordo com o tipo informado
    if (tipo === "1") {
        veiculo = new Carro_1.Carro(placa);
    }
    else if (tipo === "2") {
        veiculo = new Moto_1.Moto(placa);
    }
    else {
        veiculo = new Utilitario_1.Utilitario(placa);
    }
    estacionamento.registrarEntrada(veiculo);
    console.log(`Veículo registrado: ${veiculo.obterTipo()} ${veiculo.placa}`);
    console.log(`Horário de entrada: ${dataHora(veiculo.horarioEntrada)}`);
}
async function saidaVeiculo(estacionamento) {
    const placa = await teclado.question("Placa do veículo: ");
    const registro = estacionamento.registrarSaida(placa);
    console.log("\n===COMPROVANTE===");
    console.log(`Placa: ${registro.placa} | Tipo: ${registro.tipo}`);
    console.log(`Entrada: ${dataHora(registro.entrada)}`);
    console.log(`Saída: ${dataHora(registro.saida)}`);
    console.log(`Tempo de permanência: ${registro.minutosPermanencia} minutos`);
    console.log(`Horas cobradas: ${registro.horasCobradas}`);
    console.log(`Valor a pagar: ${moeda(registro.valorPago)}`);
}
function listarVeiculos(estacionamento) {
    const veiculos = estacionamento.listarVeiculos();
    console.log("\n===VEÍCULOS ESTACIONADOS===");
    if (veiculos.length === 0) {
        console.log("Nenhum veículo estacionado.");
        return;
    }
    for (const veiculo of veiculos) {
        console.log(`${veiculo.obterTipo()} ${veiculo.placa} | Entrada: ${dataHora(veiculo.horarioEntrada)}`);
    }
}
function exibirRelatorio(estacionamento) {
    console.log("\n===RELATÓRIO DE ATENDIMENTO===");
}
async function inicar() {
    try {
        console.log("===SISTEMA DE ESTACIONAMENTO===");
        const capacidade = await perguntarCapacidade();
        const estacionamento = new Estacionamento_1.Estacionamento(capacidade);
        let executando = true;
        while (executando) {
            console.log("======MENU======");
            console.log("1 - Registrar entrada de veículo");
            console.log("2 - Registrar saída de veículo");
            console.log("3 - Listar veículos estacionados");
            console.log("4 - Consultar vagas disponíveis");
            console.log("5 - Gerar relatório de atendimento");
            console.log("6 - Sair do sistema");
            const opcao = (await teclado.question("Escolha uma opção: ")).trim();
            try {
                switch (opcao) {
                    case "1":
                        await entradaVeiculo(estacionamento);
                        break;
                    case "2":
                        await saidaVeiculo(estacionamento);
                        break;
                    case "3":
                        listarVeiculos(estacionamento);
                        break;
                    case "4":
                        console.log(`Vagas disponíveis: ${estacionamento.consultarVagasDisponiveis()}`);
                        break;
                    case "5":
                        exibirRelatorio(estacionamento);
                        break;
                    case "6":
                        console.log("Saindo do sistema...");
                        executando = false;
                        break;
                    default:
                        console.log("Opção inválida. Digite um número de 1 a 6.");
                }
            }
            catch (error) {
                console.log("Erro:", error instanceof Error ? error.message : "Erro inesperado");
            }
        }
    }
    finally {
        teclado.close();
    }
}
void inicar().catch((error) => {
    console.error("Falha no programa:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
