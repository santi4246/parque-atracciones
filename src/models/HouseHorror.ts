import { Atracciones } from "./Atracciones";

class HouseHorror extends Atracciones {  
    private _nivel: number;
    private _nocturno: boolean = false;

    constructor (id: number, nombre: string, precioBaseEntrada: number, capacidadMaximaDePersonas: number, nivel: number) {
            super(id, nombre, precioBaseEntrada, capacidadMaximaDePersonas);
            this._nivel = nivel;
        }

    calcularCostoOperacion(): number {
            return this._precioBaseEntrada * this._capacidadMaximaDePersonas;
        }

    get nivel(): number {
        return this._nivel;
    }

    set nivel(nivel: number) {
        if (nivel >= 1 && nivel <= 5) {
            this._nivel = nivel;
        } else {
            console.log("El nivel debe estar entre 1 y 5.");
        }
    }

    get nocturno(): boolean {
        return this._nocturno;
    }

    set nocturno(nocturno: boolean) {
        this._nocturno = nocturno;
        this._nocturno ? this.activar() : this.desactivar();
    }
}

export { HouseHorror };