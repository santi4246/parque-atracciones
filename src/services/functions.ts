import { Interface } from "readline";
import { Atracciones, RollerCoaster, HouseHorror, Carrousel, Parque } from "../models/Models";

// -------------------- Utilidades genéricas --------------------

/**
 * Pregunta por consola y devuelve la respuesta como string (trim).
 */
const ask = (rl: Interface, prompt: string): Promise<string> =>
  new Promise((resolve) => rl.question(prompt, (answer) => resolve(answer.trim())));

/**
 * Intenta parsear a número y valida con predicado. Reintenta mostrando mensaje de error.
 */
const askAndValidateNumber = async (
  rl: Interface,
  prompt: string,
  {
    parser = Number,
    isValid,
    errorMessage,
  }: {
    parser?: (s: string) => number;
    isValid: (n: number) => boolean;
    errorMessage: (input: string) => string;
  }
): Promise<number> => {
  while (true) {
    const raw = await ask(rl, prompt);
    const value = parser(raw);
    if (!Number.isFinite(value) || Number.isNaN(value)) {
      console.log(errorMessage(raw));
      continue;
    }
    if (!isValid(value)) {
      console.log(errorMessage(raw));
      continue;
    }
    return value;
  }
};

/**
 * Valida que exista al menos una atracción en el parque.
 */
const hayAtracciones = (parque: Parque): boolean => {
  const lista = parque.atracciones as Atracciones[];
  if (!lista || lista.length === 0) {
    console.log("\nNo hay atracciones registradas. Primero debe ingresar una.");
    return false;
  }
  return true;
};

/**
 * Muestra lista de atracciones con su ID real y su información.
 */
const printListadoAtracciones = (parque: Parque) => {
  const lista = parque.atracciones as Atracciones[];
  console.log("\n--- Atracciones disponibles ---");
  lista.forEach((atraccion) => {
    console.log(`\n--- Atracción: ${atraccion.id} - ${atraccion.nombre} ---\n`);
    console.log(atraccion.mostrarInformacion());
    console.log(`\n-------------------------------\n`);
  });
};

/**
 * Pregunta una atracción por ID mostrado.
 * Mantiene compatibilidad si los IDs son 1..N consecutivos; de lo contrario usa índice 1..N.
 */
const askAtraccionById = async (rl: Interface, parque: Parque): Promise<Atracciones> => {
  const lista = parque.atracciones as Atracciones[];
  const n = lista.length;

  const ids = lista.map((a) => a.id);
  const idsSonConsecutivos = ids.every((id, i) => id === i + 1);

  const idOrIndex = await askAndValidateNumber(rl, "Ingrese el ID de la atracción: ", {
    isValid: (num) => Number.isInteger(num) && num >= 1 && num <= n,
    errorMessage: () => `ID inválido. Debe ingresar un número entre 1 y ${n}.`,
  });

  if (idsSonConsecutivos) {
    const found = lista.find((a) => a.id === idOrIndex);
    return found ?? lista[idOrIndex - 1];
  }

  return lista[idOrIndex - 1];
};

/**
 * Pregunta por un entero positivo genérico.
 */
const askEnteroPositivo = async (rl: Interface, prompt: string): Promise<number> =>
  askAndValidateNumber(rl, prompt, {
    isValid: (n) => Number.isInteger(n) && n > 0,
    errorMessage: () => "Número inválido. Debe ingresar un número entero positivo.",
  });

/**
 * Pregunta una cantidad de personas que no exceda la capacidad de la atracción.
 */
const askCantidadPersonas = async (rl: Interface, atraccion: Atracciones): Promise<number> =>
  askAndValidateNumber(rl, `Ingrese el número de personas a ingresar a "${atraccion.nombre}": `, {
    isValid: (n) => Number.isInteger(n) && n >= 1 && n <= atraccion.cantidadMaximaDePersonas,
    errorMessage: (raw) => {
      const val = Number(raw);
      if (!Number.isFinite(val) || Number.isNaN(val) || !Number.isInteger(val) || val < 1) {
        return "Número inválido. Debe ingresar un número entero positivo.";
      }
      return `No se pueden ingresar ${val} personas. La capacidad máxima es de ${atraccion.cantidadMaximaDePersonas}.`;
    },
  });

/**
 * Pregunta tiempo de recorrido en segundos (entero positivo).
 */
const askTiempoSegundos = (rl: Interface) =>
  askEnteroPositivo(rl, "Ingrese el tiempo de duración del recorrido en segundos: ");

// -------------------- Lógica de negocio actual --------------------

const opciones: { [key: number]: string } = {
  1: "Montaña Rusa",
  2: "Casa del Terror",
  3: "Carrusel",
};

const ingresarNuevaAtraccion = (rl: Interface, parque: Parque, callback: () => void) => {
  (async () => {
    const opcionNum = await askAndValidateNumber(
      rl,
      "\nIngrese el tipo de atracción:\n1 - Montaña Rusa\n2 - Casa del Terror\n3 - Carrusel\nOpción: ",
      {
        isValid: (n) => Number.isInteger(n) && !!opciones[n],
        errorMessage: () => "\nTipo de atracción inválido. Intente de nuevo.",
      }
    );

    console.log(`\nSeleccionaste: ${opciones[opcionNum]}`);

    const nombre = await ask(rl, "Ingrese el nombre de la atracción: ");
    const precio = await askEnteroPositivo(rl, "Ingrese el precio base de entrada: ");
    const capacidad = await askEnteroPositivo(rl, "Ingrese la capacidad máxima de personas: ");

    const lista = parque.atracciones as Atracciones[];
    const nuevoId = (lista?.length ?? 0) + 1;

    switch (opcionNum) {
      case 1: {
        const altura = await askEnteroPositivo(rl, "Ingrese la altura mínima requerida expresada en cm: ");
        const rollerCoaster = new RollerCoaster(nuevoId, nombre, Number(precio), Number(capacidad), Number(altura));
        // Requiere método público en Parque:
        (parque as any).agregarAtraccion ? (parque as any).agregarAtraccion(rollerCoaster) : (lista as Atracciones[]).push(rollerCoaster);
        console.log("\n✓ Atracción creada exitosamente:");
        console.log(rollerCoaster.mostrarInformacion());
        break;
      }
      case 2: {
        const nivel = await askEnteroPositivo(rl, "Ingrese el nivel: ");
        const houseHorror = new HouseHorror(nuevoId, nombre, Number(precio), Number(capacidad), Number(nivel));
        (parque as any).agregarAtraccion ? (parque as any).agregarAtraccion(houseHorror) : (lista as Atracciones[]).push(houseHorror);
        console.log("\n✓ Atracción creada exitosamente:");
        console.log(houseHorror.mostrarInformacion());
        break;
      }
      case 3: {
        const caballos = await askEnteroPositivo(rl, "Ingrese el número de caballos: ");
        if (Number(caballos) >= Number(capacidad)) {
          const carrusel = new Carrousel(nuevoId, nombre, Number(precio), Number(capacidad), Number(caballos));
          (parque as any).agregarAtraccion ? (parque as any).agregarAtraccion(carrusel) : (lista as Atracciones[]).push(carrusel);
          console.log("\n✓ Atracción creada exitosamente:");
          console.log(carrusel.mostrarInformacion());
        } else {
          console.log("\nEl número de caballos no puede ser menor que la capacidad máxima de personas.");
          console.log("\nIntente de nuevo.\nVolviendo al menú principal.");
        }
        break;
      }
      default:
        console.log("Funcionalidad en desarrollo.");
    }
  })()
    .catch((e) => {
      console.error("Error al ingresar nueva atracción:", e);
    })
    .finally(callback);
};

const mostrarActracciones = (parque: Parque, callback: () => void) => {
  const response = hayAtracciones(parque);
  if (response) {
    console.log(`Mostrando todas las atracciones del parque "${parque.nombre}" (${parque.ubicacion})...`);
    printListadoAtracciones(parque);
  }
  callback();
};

const activarAtraccion = (rl: Interface, parque: Parque, callback: () => void) => {
  (async () => {
    if (!hayAtracciones(parque)) return;

    const lista = parque.atracciones as Atracciones[];
    lista.forEach((atraccion) => {
      console.log(`\n--- Atracción: ${atraccion.id} - ${atraccion.nombre} ---\n`);
      console.log(`\n-------------------------------\n`);
    });

    const atraccion = await askAtraccionById(rl, parque);

    if (atraccion instanceof HouseHorror) {
      const ahora = new Date();
      const hora = ahora.getHours();
      const minutos = ahora.getMinutes();
      const esNocturno = hora >= 20 || hora < 7;

      if (esNocturno) {
        atraccion.nocturno = true;
        atraccion.activar();
        console.log(`\n✓ Atracción "${atraccion.nombre}" activada en modo NOCTURNO`);
        console.log(`Hora actual: ${hora}:${minutos.toString().padStart(2, "0")}`);
        console.log(atraccion.mostrarInformacion());
      } else {
        console.log(`\n✗ No es horario nocturno (20:00 - 06:59).`);
        console.log(`Hora actual: ${hora}:${minutos.toString().padStart(2, "0")}`);
        console.log(`La atracción "${atraccion.nombre}" no puede activarse en el horario actual.`);
      }
    } else {
      atraccion.activar();
      console.log(`\n✓ La atracción "${atraccion.nombre}" ha sido activada.`);
      console.log(atraccion.mostrarInformacion());
    }
  })()
    .catch((e) => console.error("Error al activar atracción:", e))
    .finally(callback);
};

const ingresarPersonas = (rl: Interface, parque: Parque, callback: () => void) => {
  (async () => {
    if (!hayAtracciones(parque)) return;

    printListadoAtracciones(parque);
    const atraccion = await askAtraccionById(rl, parque);

    if (atraccion.estado !== "abierta") {
      console.log(`La atracción "${atraccion.nombre}" no está activa. No se pueden ingresar personas.`);
      return;
    }
    if (atraccion.enFuncionamiento) {
      console.log(`La atracción "${atraccion.nombre}" está en funcionamiento. Espere a que termine el recorrido actual.`);
      return;
    }

    const cantidad = await askCantidadPersonas(rl, atraccion);
    const tiempoSeg = await askTiempoSegundos(rl);

    atraccion.ingresarPersonas = cantidad;
    atraccion.enFuncionamiento = true;

    console.log(`\n✓ Se han ingresado ${cantidad} personas a la atracción "${atraccion.nombre}".`);
    console.log(`⏱️  La atracción estará en funcionamiento durante ${tiempoSeg} segundos.`);
    console.log(atraccion.mostrarInformacion());

    setTimeout(() => {
      // Recomendado: agrega un método público en Atracciones: vaciar()
      // atraccion.vaciar();
      atraccion.enFuncionamiento = false;
      console.log(`\n🔔 La atracción "${atraccion.nombre}" ha finalizado su recorrido. Ahora está disponible.`);
      // Regla adicional existente:
      atraccion instanceof RollerCoaster ? atraccion.desactivar() : null;
    }, tiempoSeg * 1000);
  })()
    .catch((e) => console.error("Error al ingresar personas:", e))
    .finally(callback);
};

const ponerMantenimiento = async (rl: Interface, parque: Parque, callback: () => void) => {
  (async () => {
    if (!hayAtracciones(parque)) return;

    const lista = parque.atracciones as Atracciones[];
    lista.forEach((atraccion) => {
      console.log(`\n--- Atracción: ${atraccion.id} - ${atraccion.nombre} ---\n`);
      console.log(`\n-------------------------------\n`);
    });

    const atraccion = await askAtraccionById(rl, parque);
    atraccion instanceof Carrousel ? atraccion.Mantenimiento(true) : null;

    if (atraccion.estado !== "mantenimiento") {
      atraccion.desactivar();
      console.log(`\n✓ La atracción "${atraccion.nombre}" ha sido puesta en mantenimiento y desactivada.`);
    }
    console.log(atraccion.mostrarInformacion());
  })()
    .catch((e) => console.error("Error al poner en mantenimiento:", e))
    .finally(callback);
};

const calcularCostoParque = async (rl: Interface, parque: Parque, callback: () => void) => {
  (async () => {
    if (!hayAtracciones(parque)) return;
    const opcionNum = await askAndValidateNumber(
        rl,
        "\nIngrese la opcion:\n1 - Por atracción\n2 - Todas las atracciones\nOpción: ",
        {
          isValid: (n) => Number.isInteger(n) && !!opciones[n],
          errorMessage: () => "\nTipo de opcion inválida. Intente de nuevo.",
        }
      );
      switch (opcionNum) {
        case 1:          
          printListadoAtracciones(parque);          
          const atraccion = await askAtraccionById(rl, parque);
          console.log(`\n------ Imprimiendo datos ------\n`);
          console.log(`${atraccion.nombre}, costo estimado: ${atraccion.calcularCostoOperacion()}`);
          console.log(`\n------ * ------`)
          break;
        case 2:          
          const costo = parque.atracciones.reduce((acc, value) => acc + value.calcularCostoOperacion(), 0);
          console.log(`\n------ Imprimiendo datos ------\n`);
          console.log(`Costo estimado del parque: ${costo}`)
          console.log(`\n------ * ------`)
          break;
        default:
          "\nOpción no disponible\n"          
          break;
      }
  })()
  .catch(error => console.log(`Ha ocurrido un error: ${error}`))
  .finally(callback)
}

export { ingresarNuevaAtraccion, mostrarActracciones, activarAtraccion, ingresarPersonas, ponerMantenimiento, calcularCostoParque };