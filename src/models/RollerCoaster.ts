import { Atracciones } from "./Atracciones";

class RollerCoaster extends Atracciones {
    private _alturaMinima: number = 1.60;
    private _tax: number = 0.15;

    constructor (id: number, nombre: string, precioBaseEntrada: number, capacidadMaximaDePersonas: number, alturaMinima: number) {
        super(id, nombre, precioBaseEntrada, capacidadMaximaDePersonas);
        this._alturaMinima = alturaMinima;
    }

    calcularCostoOperacion(): number {
        const costo = this._precioBaseEntrada * this._capacidadMaximaDePersonas
        return  costo - (costo * this._tax);
    }

    public get alturaMinima(): number {
        return this._alturaMinima;
    }

    public set alturaMinima(altura: number) {
        if (altura >= 0) {
            this._alturaMinima = altura;
        } else {
            console.log("La altura mínima no puede ser negativa o un valor nulo.");
        }
    }
}

export { RollerCoaster };