# Calculadora

Una calculadora web construida con React, TypeScript y Vite. Incluye operaciones básicas y avanzadas, validaciones de display, tests con Vitest y documentación de componentes con Storybook.

## Link deployado

> http://209.126.125.149:3001/

---

## Tecnologías

- React 19 + TypeScript
- Vite 8
- Vitest + Testing Library (tests)
- Storybook 8 (documentación de componentes)
- ESLint (linting con JavaScript Standard + reglas custom)
- Docker + Nginx (despliegue)

---

## Requisitos implementados

### Funcionalidad base
- Display numérico con teclado de botones 
- Concatenación de dígitos al presionar números
- Al presionar una operación, el siguiente número limpia el display
- Operaciones encadenadas muestran resultado intermedio
- Botón `=` muestra el resultado final

### Operaciones
| Botón | Operación |
|-------|-----------|
| `+` | Suma |
| `−` | Resta |
| `×` | Multiplicación |
| `÷` | División |
| `%` | Módulo |
| `=` | Igualdad |

### Validaciones del display
- Máximo 9 caracteres (el punto decimal y el signo `−` cuentan como carácter)
- Resultado negativo → muestra `ERROR`
- Resultado mayor a `999,999,999` → muestra `ERROR`
- División por cero → muestra `ERROR`
- Resultados con muchos decimales (ej. `22/7`) se truncan a 9 caracteres


## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Correr tests
npm test

# Linting
npm run lint

# Build de producción
npm run build

# Storybook
npm run storybook
```

---

## Docker

Levantar con una sola línea:

```bash
docker compose up --build
```

La aplicación queda disponible en `http://localhost:3000`.

---

## Tests

Se implementaron **19 tests** unitarios sobre el hook `useCalculator`, cubriendo:

- Estado inicial
- Ingreso de dígitos y concatenación
- Las 5 operaciones (suma, resta, multiplicación, división, módulo)
- Operaciones encadenadas con resultado intermedio
- Límite de 9 caracteres
- Validación `ERROR` por resultado negativo
- Validación `ERROR` por resultado mayor a `999,999,999`
- División por cero
- Truncado de resultados decimales largos (ej. `22/7`)
- Punto decimal sin duplicación
- Función `+/-` y doble toggle
- `AC` que reinicia el estado

```bash
npm test
```

---

## Storybook

Se implementaron historias para los 3 componentes principales:

- **Display** — 5 historias: Default, LargeNumber, Decimal, Error, Negative
- **CalcButton** — 5 historias: Digit, Operator, Equals, Action, Wide
- **Calculator** — 1 historia: Default (calculadora completa interactiva)

```bash
npm run storybook
# → http://localhost:6006
```

---

## Linting

Configurado con ESLint Flat Config y las siguientes reglas:

- Sin punto y coma (`semi: error`)
- Máximo 120 caracteres por línea (`max-len: 120`)
- Sin variables sin usar

```bash
npm run lint
# Sin errores
```