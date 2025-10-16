import { Atracciones } from "./Atracciones";

class Parque {
    private _nombre: string;
    private _ubicacion: string;
    private _atracciones: Atracciones[] = [];
    
    constructor(nombre: string, ubicacion: string) {
        this._nombre = nombre;
        this._ubicacion = ubicacion;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get ubicacion(): string {
        return this._ubicacion;
    }

    public get atracciones(): readonly Atracciones[] {
        return this._atracciones;
    }

    public get size(): number {
        return this._atracciones.length;
    }

    public agregarAtraccion(a: Atracciones): void {
        this._atracciones.push(a);
    }
    
    public busquedaPorId(id: number): Atracciones | undefined {
        return this._atracciones.find(a => a.id === id);
    }
    
    public listar(): Atracciones[] {    
        return [...this._atracciones];
    }

    public eliminar(): Atracciones | undefined {
        return this._atracciones.pop();
    }

    public actualizarAtraccionPorId(id: number, nueva: Atracciones): boolean {
        const idx = this._atracciones.findIndex(a => a.id === id);
        if (idx === -1) return false;
        this._atracciones[idx] = nueva;
        return true;
    }
}

export { Parque };