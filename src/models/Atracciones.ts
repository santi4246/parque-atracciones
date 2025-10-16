abstract class Atracciones {
    protected _id: number;
    protected _nombre: string;
    protected _precioBaseEntrada: number;
    protected _capacidadMaximaDePersonas: number;
    protected _cantidadPersonasActuales: number;
    protected _estado: "abierta" | "cerrada" | "mantenimiento" = "cerrada";
    protected _enFuncionamiento: boolean = false;

    constructor(id: number, nombre: string, precioBaseEntrada: number, capacidadMaximaDePersonas: number) {
        this._id = id;
        this._nombre = nombre;
        this._precioBaseEntrada = precioBaseEntrada;
        this._capacidadMaximaDePersonas = capacidadMaximaDePersonas;
        this._cantidadPersonasActuales = 0;
        this._estado = "cerrada";
    }

    // Getters y Setters

    public get id(): number {
        return this._id;
    }
    public get nombre(): string {
        return this._nombre;
    }

    public get cantidadMaximaDePersonas(): number {
        return this._capacidadMaximaDePersonas;
    }

    public get estado(): "abierta" | "cerrada" | "mantenimiento" {
        return this._estado;
    }

    public get enFuncionamiento(): boolean {
        return this._enFuncionamiento;
    }

    public set enFuncionamiento(valor: boolean) {
        this._enFuncionamiento = valor;
    }

    public set cantidadMaximaDePersonas(cantidad: number) {
        if (cantidad >= 0) {
            this._capacidadMaximaDePersonas = cantidad;
        } else {
            console.log("La capacidad máxima de personas no puede ser negativa.");
        }
    }    

    public activar(): void {
        this._estado = "abierta";
    }

    public desactivar(): void {
        this._estado = "cerrada";
    }

    public set ingresarPersonas(cantidadPersonas: number) {
        if (this._estado === "abierta" && (this._cantidadPersonasActuales + cantidadPersonas) <= this._capacidadMaximaDePersonas) {
            this._cantidadPersonasActuales += cantidadPersonas;
        } else {
            console.log("No se pueden ingresar más personas en este momento.");
        }
    }

    public set vaciarAtraccion(vaciado: boolean) {
        vaciado ? this._cantidadPersonasActuales = 0 : this._cantidadPersonasActuales;
    }

    abstract calcularCostoOperacion(): number;

    public mostrarInformacion(): string {        
        return `
        Nombre: ${this._nombre}\n
        Precio Base de Entrada: ${this._precioBaseEntrada}\n
        Capacidad Máxima de Personas: ${this._capacidadMaximaDePersonas}\n
        Cantidad de Personas Actuales: ${this._cantidadPersonasActuales}\n
        Estado: ${this._estado}\n
        `;
    }
}

export { Atracciones };