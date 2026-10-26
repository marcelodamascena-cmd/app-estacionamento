import { TipoVeiculo, Veiculo } from "./Veiculo";

export class Moto extends Veiculo
{
    constructor(placa: string, horarioEntrada: Date = new Date())
    {
        super(placa, horarioEntrada)
    }

    public override obterTipo(): string 
    {
        return "Moto";        
    }

    public override calcularTarifa(horarioSaida: Date): number 
    {
        return this.calcularHorasCobradas(horarioSaida) * 7    
    }

}