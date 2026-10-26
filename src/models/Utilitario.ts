import { TipoVeiculo, Veiculo } from "./Veiculo";

export class Utilitario extends Veiculo
{
    constructor(placa: string, horarioEntrada: Date = new Date())
    {
        super(placa, horarioEntrada)
    }

    public override obterTipo(): string 
    {
        return "Utilitário";        
    }

    public override calcularTarifa(horarioSaida: Date): number 
    {
        return this.calcularHorasCobradas(horarioSaida) * 18    
    }

}