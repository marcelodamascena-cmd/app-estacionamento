import { Veiculo } from "../models/Veiculo";

export type RegistroSaida =
{
    placa: string;
    tipo: string;
    entrada: Date;
    saida: Date;
    minutosPermanencia: number;
    horasCobradas: number;
    valorPago: number;
};

export class Estacionamento
{
    //Os arreys são privados: Só os métodos da classe podem altera-lo
    private readonly veiculo: Veiculo[] = [];
    private readonly historico: RegistroSaida[] = [];
    private readonly capacidade: number; 

    constructor(capacidade: number)
    {
        if(!Number.isSafeInteger(capacidade) || capacidade <= 0)
        {
            throw new Error("A capacidade deve ser um número inteiro maior que zero")
        }

        this.capacidade = capacidade;
    }

    public consultarVagasDisponiveis(): number
    {
        return this.capacidade - this.veiculo.length;
    }

    public registrarEntrada(veiculo: Veiculo): void
    {
        //Verifica o numero de vagas disponível
        if(this.consultarVagasDisponiveis()===0)
        {
            throw new Error("Estácionamento lotado! Não há vagas")
        }

        //Verifica se tem veiculo estácionado com a mesma placa
        if(this.veiculo.some(item => item.placa === veiculo.placa))
        {
            throw new Error("Esta placa já está estacionada")
        }
        this.veiculo.push(veiculo);
    }

    public registrarSaida(placa: string, horarioSaida: Date = new Date()): RegistroSaida
    {
        const placaBusca = placa.trim().toUpperCase().replace(/[\s-]/g,"");
        const indice = this.veiculo.findIndex(item => item.placa === placaBusca)

        if(indice === -1)
        {
            throw new Error("Veículo não encontrado no estacionamento")
        }

        const veiculo = this.veiculo[indice];
        
        const registro: RegistroSaida =
        {
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
        }
    }

    public listarVeiculos(): Veiculo[]
    {
        return[...this.veiculo];
    }

    public gerarRelatorio():{
        totalAtendidos: number;
        valorArrecadado: number;
        registros: RegistroSaida[];
    }
    {
        const registros = this.historico.map(registro =>({
            ...registro,
            entrada: new Date(registro.entrada),
            saida: new Date(registro.saida)
        }))

        return{
            totalAtendidos: this.historico.length,
            valorArrecadado: this.historico.reduce((total, registro)=> total + registro.valorPago,0),
            registros
        };
    }

}