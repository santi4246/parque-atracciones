import { Atracciones } from "./Atracciones";

class Carrousel extends Atracciones {
    private _numeroDeCaballos: number

    constructor (id: number, nombre: string, precioBaseEntrada: number, capacidadMaximaDePersonas: number, numeroDeCaballos: number) {
        super(id, nombre, precioBaseEntrada, capacidadMaximaDePersonas);
        this._numeroDeCaballos = numeroDeCaballos;
    }

    calcularCostoOperacion(): number {
        return this._precioBaseEntrada * this._capacidadMaximaDePersonas;
    }

    get numeroDeCaballos(): number {
        return this._numeroDeCaballos;
    }

    public Mantenimiento(estado: boolean): void {
        this._estado = estado ? "mantenimiento" : "cerrada";
    }

    public set ingresarPersonas(cantidadPersonas: number) {
        if (this._estado === "abierta" && (this._cantidadPersonasActuales + cantidadPersonas) <= this._capacidadMaximaDePersonas) {
            this._cantidadPersonasActuales += cantidadPersonas;
        } else {
            console.log("No se pueden ingresar más personas en este momento.");
        }
    }
}

export { Carrousel };