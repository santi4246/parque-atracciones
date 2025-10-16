# 🎢 Sistema de Gestión de Parque de Atracciones

![Vista previa del proyecto](./cap.png)

## 📝 Descripción
Sistema de consola para gestionar un parque de atracciones. Permite crear atracciones, activarlas, ingresar personas, simular recorridos con tiempos, poner en mantenimiento y mostrar información detallada. Enfocado en Programación Orientada a Objetos con **TypeScript**.

---

## ✨ Características
- Registro de atracciones: Montaña Rusa, Casa del Terror, Carrusel.
- Activación y desactivación de atracciones.
- Ingreso de personas con validaciones de capacidad.
- Simulación de recorrido con setTimeout y estado “en funcionamiento”.
- Vaciado automático al finalizar el recorrido.
- Reglas específicas (ej. horario nocturno para Casa del Terror).
- Mantenimiento de atracciones.
- Interfaz de consola con readline.
## 💻 Tecnologías
- TypeScript
- Node.js
- Readline (Node.js)
### 🧭 Paradigma POO
- Abstracción: clase abstracta Atracciones.
- Encapsulamiento: propiedades privadas/protegidas con getters/setters.
- Herencia: RollerCoaster, HouseHorror, Carrousel heredan de Atracciones.
- Polimorfismo: métodos como calcularCostoOperacion/activar.
- Composición: clase Parque gestiona la colección de Atracciones.

---

## 🧩 Estructura del Proyecto
```bash
ATRACCIONES/
 ├─ node_modules/
 ├─ src/
 │   ├─ models/
 │   │   ├─ Atracciones.ts
 │   │   ├─ Carrousel.ts
 │   │   ├─ HouseHorror.ts
 │   │   ├─ Models.ts           # reexporta clases
 │   │   ├─ Parque.ts
 │   │   └─ RollerCoaster.ts
 │   │
 │   ├─ services/
 │   │   └─ functions.ts        # lógica de flujo y consola
 │   │
 │   ├─ index.js
 │   └─ index.ts                # entrypoint
 │
 ├─ cap.png
 ├─ package.json
 ├─ package-lock.json
 ├─ tsconfig.json
 └─ README.md
```

### 🔧 Funcionalidades
- Ingresar nueva atracción:
Datos comunes: nombre, precio base, capacidad.
Datos específicos: altura mínima (Montaña Rusa), nivel (Casa del Terror), caballos (Carrusel).
Validación de entradas por consola.
- Mostrar atracciones: listado con ID real y estado.
- Activar atracción:
Casa del Terror: requiere horario nocturno (20:00 a 06:59).
- Ingresar personas a una atracción:
Requiere estado “abierta” y no “en funcionamiento”.
Validación de capacidad y entero positivo.
Tiempo de recorrido en segundos.
setTimeout para simular y liberar al terminar.
- Poner en mantenimiento:
Cambia estado a “mantenimiento” y desactiva si corresponde.
- Calcular costo total de operación:
Permite elegir entre una sola atracción o todas las del parque

## 🖥️ Menú del programa
```
| Opción | Descripción                          |
| ------ | ------------------------------------ |
| 1      | Ingresar nueva atracción             |
| 2      | Mostrar todas las atracciones        |
| 3      | Activar una atracción                |
| 4      | Ingresar personas a una atracción    |
| 5      | Poner en mantenimiento una atracción |
| 6      | Calcular costo total de operación    |
| 0      | Salir del programa                   |
```

### ▶️ Cómo Inicializar
Requisitos:
Node.js (con npm)
Instalación:
```
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```
### Instalar dependencias
```
yarn install
# o
npm install
```
### Scripts (ejemplo)
```
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/app/main.ts"
  }
}
```
### Compilar
```
npm run build
```
### Ejecutar
```
npm start
```
### Desarrollo
```
npm run dev
```
### Configuración Typescript (ejemplo)
```
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```
## 📄 Licencia
MIT (o la que elijas)
## 👤 Autor
```
Santiago Romero / https://www.santiago-romero.online / https://www.linkedin.com/in/santiago-romero-santi4246/
```