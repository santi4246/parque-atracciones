import * as readline from "readline";
import { Parque } from "./models/Models";
import { activarAtraccion, calcularCostoParque, ingresarNuevaAtraccion, ingresarPersonas, mostrarActracciones, ponerMantenimiento } from "./services/functions";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const parque: Parque = new Parque("Parque del Sol", "Paraná, Entre Ríos");

const MenuView = () => {
  console.log("\n--- Menú ---");
  console.log("1. Ingresar nueva atraccion");
  console.log("2. Mostrar todas las atracciones");
  console.log("3. Activar una atracción");
  console.log("4. Ingresar personas a una atracción");
  console.log("5. Poner en mantenimimiento una atracción");
  console.log("6. Calcular costo total de operación");
  console.log("0. Salir");
  rl.question("Seleccione una opción: ", manejarOpcion);
};

const manejarOpcion = (opcion: string) => {
  switch (opcion) {
    case "1":
        ingresarNuevaAtraccion(rl, parque, MenuView);
        break;
    case "2":
        mostrarActracciones(parque, MenuView);      
        break;
    case "3":        
        activarAtraccion(rl, parque, MenuView);        
        break;
    case "4":
        ingresarPersonas(rl, parque, MenuView);      
        break;
    case "5":
        ponerMantenimiento(rl, parque, MenuView);
        break;
    case "6":
      calcularCostoParque(rl, parque, MenuView);
      break;
    case "0":
      console.log("Saliendo...");
      rl.close();
      break;
    default:
      console.log("Opción no válida. Intente de nuevo.");
      MenuView();
      break;
  }
};
console.log(`\n-------- Bienvenido al menú del sistema del Parque de Atracciones --------\n`);
MenuView();